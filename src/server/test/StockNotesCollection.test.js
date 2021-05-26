const { verifyEmptyArray, verifyNoteData } = require('./utils/index');
const createTestCollection = require('./utils/createTestCollection');
const StockNotesCollection = require('../db/NotesCollection/StockNotesCollection');

const FIELDS = [ 'trade', 'value', 'story', 'fundamentals', 'technicals', 'chips'];

function genNote(comment) {
  const note = { createTime: Date.now() };
  FIELDS.forEach(key => note[key] = { comment });
  return note;
}
const fakeData = [
  {
    id: '2330', notes: [ genNote('fakeData0-1') ],
  }, {
    id: '2317', notes: [ genNote('fakeData1-1') ],
  }, {
    id: '3008', notes: [ genNote('fakeData2-1') ],
  },
];

let stockNotes = null;
let testTarget = null;

beforeAll(async function () {
  testTarget = await createTestCollection(StockNotesCollection);
  stockNotes = testTarget.collection;
});

afterAll(function () {
  return testTarget.destroy();
});

describe('StockNotesCollection', () => {
  it('should not save invalid stock notes', async () => {
    let data = null;
    let invalids = null;

    await stockNotes.save(invalids).catch(() => {});
    data = await stockNotes.getAll();
    verifyEmptyArray(data);

    invalids = [
      {
        id: '1234',
        note: genNote(),
      }, {
        id: '5678',
        note: genNote(),
      },
    ];
    await stockNotes.save(invalids).catch(() => {});
    data = await stockNotes.getAll();
    verifyEmptyArray(data);

    invalids = [
      {
        id: '1234',
      }, {
        id: '5678',
      },
    ];
    await stockNotes.save(invalids).catch(() => {});
    data = await stockNotes.getAll();
    verifyEmptyArray(data);
  });

  it('should save stock notes', async () => {
    const payloads = [];
    payloads.push({
      id: '2330', note: fakeData[0].notes[0],
    });
    payloads.push({
      id: '2317', note: fakeData[1].notes[0],
    });
    payloads.push({
      id: '3008', note: fakeData[2].notes[0],
    });
    await stockNotes.save(payloads);
    const data = await stockNotes.getAll();
    verifyNoteData(data, fakeData);
  });

  // NOTICE: Bad smell, the below tests rely on the saved data from the above test
  // and have the order-dependency. This is faster but should refactor once tests get complicated.
  describe('', () => {
    it('should push one note into notes', async () => {
      const note = genNote('fakeData1-2');
      fakeData[1].notes.push(note);
      await stockNotes.update(fakeData[1].id, { action: 'add', note });
      const data = await stockNotes.get([ fakeData[1].id ]);
      verifyNoteData(data, [ fakeData[1] ]);
    });

    it('should update one note in notes', async () => {
      const fakeData1 = fakeData[1];
      let note0 = fakeData1.notes[0];
      note0 = fakeData1.notes[0] = {
        ...genNote(note0.trade.comment + 'updated'),
        createTime: note0.createTime,
      };
      await stockNotes.update(fakeData[1].id, { action: 'update', note: note0 });
      const [ updatedfakeData1 ] = await stockNotes.get([ fakeData1.id ]);
      expect(updatedfakeData1.createTime).toBe(fakeData1.createTime);
      verifyNoteData([ updatedfakeData1 ], [ fakeData1 ]);
    });

    it('should delete one note in notes', async () => {
      const fakeData1 = fakeData[1];
      const note0 = fakeData1.notes.shift();
      await stockNotes.update(fakeData[1].id, { action: 'delete', note: note0 });
      const [ updatedfakeData1 ] = await stockNotes.get([ fakeData1.id ]);
      expect(updatedfakeData1.createTime).toBe(fakeData1.createTime);
      verifyNoteData([ updatedfakeData1 ], [ fakeData1 ]);
    });

    it('should remove stock notes', async () => {
      await stockNotes.remove([ fakeData[1].id ]);
      const data = await stockNotes.getAll();
      verifyNoteData(data, [ fakeData[0], fakeData[2] ]);
    });
  });
});

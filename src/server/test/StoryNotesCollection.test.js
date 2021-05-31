const { verifyEmptyArray, verifyNoteData } = require('./utils/index');
const createTestCollection = require('./utils/createTestCollection');
const StoryNotesCollection = require('../db/NotesCollection/StoryNotesCollection');

const FIELDS = [ 'good', 'bad' ];

function genNote(comment) {
  const note = { createTime: Date.now() };
  FIELDS.forEach(key => note[key] = { comment });
  return note;
}
const fakeData = [
  {
    id: '2330', notes: [ genNote('fakeData0-1') ], noteMeta: { title: 'fakeData0' },
  }, {
    id: '2317', notes: [ genNote('fakeData1-1') ], noteMeta: { title: 'fakeData1' },
  }, {
    id: '3008', notes: [ genNote('fakeData2-1') ], noteMeta: { title: 'fakeData2' },
  },
];

let storyNotes = null;
let testTarget = null;

beforeAll(async function () {
  testTarget = await createTestCollection(StoryNotesCollection);
  storyNotes = testTarget.collection;
});

afterAll(function () {
  return testTarget.destroy();
});

describe('StoryNotesCollection', () => {
  it('should not save invalid story notes', async () => {
    let data = null;
    let invalids = null;

    await storyNotes.save(invalids).catch(() => {});
    data = await storyNotes.getAll();
    verifyEmptyArray(data);

    invalids = [
      {
        id: '1234',
      }, {
        id: '5678',
      },
    ];
    await storyNotes.save(invalids).catch(() => {});
    data = await storyNotes.getAll();
    verifyEmptyArray(data);

    invalids = [
      {
        id: '1234',
        note: genNote('1234'),
      }, {
        id: '5678',
        note: genNote('5678'),
      },
    ];
    await storyNotes.save(invalids).catch(() => {});
    data = await storyNotes.getAll();
    verifyEmptyArray(data);

    invalids = [
      {
        id: '1234',
        note: genNote(),
        noteMeta: { title: '1234' },
      }, {
        id: '5678',
        note: genNote(),
        noteMeta: { title: '5678' },
      },
    ];
    await storyNotes.save(invalids).catch(() => {});
    data = await storyNotes.getAll();
    verifyEmptyArray(data);
  });

  it('should save story notes', async () => {
    const payloads = fakeData.map(({ notes, ...rest }) => ({ note: notes[0], ...rest }));
    await storyNotes.save(payloads);
    const data = await storyNotes.getAll();
    verifyNoteData(data, fakeData);
  });

  // NOTICE: Bad smell, the below tests rely on the saved data from the above test
  // and have the order-dependency. This is faster but should refactor once tests get complicated.
  describe('', () => {
    it('should push one note into notes', async () => {
      const note = genNote('fakeData1-2');
      fakeData[1].notes.push(note);
      await storyNotes.update(fakeData[1].id, { action: 'add', note });
      const data = await storyNotes.get([ fakeData[1].id ]);
      verifyNoteData(data, [ fakeData[1] ]);
    });

    it('should update one note in notes', async () => {
      const fakeData1 = fakeData[1];
      let note0 = fakeData1.notes[0];
      note0 = fakeData1.notes[0] = {
        ...genNote(note0.good.comment + 'updated'),
        createTime: note0.createTime,
      };
      await storyNotes.update(fakeData[1].id, { action: 'update', note: note0 });
      const [ updatedfakeData1 ] = await storyNotes.get([ fakeData1.id ]);
      expect(updatedfakeData1.createTime).toBe(fakeData1.createTime);
      verifyNoteData([ updatedfakeData1 ], [ fakeData1 ]);
    });

    it('should delete one note in notes', async () => {
      const fakeData1 = fakeData[1];
      const note0 = fakeData1.notes.shift();
      await storyNotes.update(fakeData[1].id, { action: 'delete', note: note0 });
      const [ updatedfakeData1 ] = await storyNotes.get([ fakeData1.id ]);
      expect(updatedfakeData1.createTime).toBe(fakeData1.createTime);
      verifyNoteData([ updatedfakeData1 ], [ fakeData1 ]);
    });

    it('should remove stock notes', async () => {
      await storyNotes.remove([ fakeData[1].id ]);
      const data = await storyNotes.getAll();
      verifyNoteData(data, [ fakeData[0], fakeData[2] ]);
    });
  });
});

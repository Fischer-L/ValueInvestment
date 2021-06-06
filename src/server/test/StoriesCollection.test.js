const createTestCollection = require('./utils/createTestCollection');
const StoriesCollection = require('../db/StoriesCollection');

function verifyData(dbOutput, fakeData) {
  dbOutput.sort((a, b) => a.id.localeCompare(b.id));
  fakeData.sort((a, b) => a.id.localeCompare(b.id));
  expect(dbOutput.length).toBe(fakeData.length);
  dbOutput.forEach((output, i) => {
    expect(output.id).toBe(fakeData[i].id);
    expect(output.title).toBe(fakeData[i].title);
  });
}

const fakeData = [
  { id: '1', title: '1' }, { id: '2', title: '2' }, { id: '3', title: '3' },
];

let stories = null;
let testTarget = null;

beforeAll(async function () {
  testTarget = await createTestCollection(StoriesCollection);
  stories = testTarget.collection;
});

afterAll(function () {
  return testTarget.destroy();
});

describe('StoriesCollection', () => {
  it('should save stories', async () => {
    await stories.save(fakeData);
    const data = await stories.getAll();
    verifyData(data, fakeData);
  });

  // NOTICE: Bad smell, this test relies on the saved data from the above test.
  // This is faster but should refactor once tests get complicated.
  it('should remove ptt users', async () => {
    await stories.remove([ fakeData[1].id ]);
    const data = await stories.getAll();
    verifyData(data, [ fakeData[0], fakeData[2] ]);
  });
});

const createTestCollection = require('./utils/createTestCollection');
const BookmarksCollection = require('../db/BookmarksCollection');

function verifyData(expected, actual) {
  expect(expected.length).toBe(actual.length);
  actual.sort((a, b) => a.id.localeCompare(b.id));
  expected.sort((a, b) => a.id.localeCompare(b.id));
  expected.forEach((v, i) => {
    expect(v.id).toBe(actual[i].id);
    expect(v.name).toBe(actual[i].name);
  });
}

const fakeData = [
  { id: '2317', name: '鴻海' },
  { id: '2330', name: '台積電' },
];

let bookmarks = null;
let testTarget = null;

beforeAll(async function () {
  testTarget = await createTestCollection(BookmarksCollection);
  bookmarks = testTarget.collection;
});

afterAll(function () {
  return testTarget.destroy();
});

describe('BookmarksCollection', () => {
  it('should save bookmarks', async () => {
    await bookmarks.save(fakeData);
    const data = await bookmarks.getAll();
    verifyData(data, fakeData);
  });

  // NOTICE: Bad smell, this test relies on the saved data from the above test.
  // This is faster but should refactor once tests get complicated.
  it('should remove bookmarks', async () => {
    await bookmarks.remove([fakeData[1].id]);
    const data = await bookmarks.getAll();
    verifyData(data, fakeData.slice(0, 1));
  });
});

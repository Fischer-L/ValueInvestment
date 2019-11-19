/* global beforeAll, afterAll, describe, expect, it */
const { closeMongoDB, connectMongoDB } = require('../db/mongo');
const BookmarksCollection = require('../db/BookmarksCollection');

class TestBookmarksCollection extends BookmarksCollection {
  constructor(db) {
    super(db);
    this._name = `TEST_${this._name}`;
  }
}

const fakeData = [
  { id: '2317', name: '鴻海' },
  { id: '2330', name: '台積電' },
];

let bookmarks = null;

function verifyData(expected, actual) {
  expect(expected.length).toBe(actual.length);
  actual.sort((a, b) => a.id.localeCompare(b.id));
  expected.sort((a, b) => a.id.localeCompare(b.id));
  expected.forEach((v, i) => {
    expect(v.id).toBe(actual[i].id);
    expect(v.name).toBe(actual[i].name);
  });
}

beforeAll(async function () {
  const db = await connectMongoDB();
  bookmarks = new TestBookmarksCollection(db);
});

afterAll(async function () {
  try {
    const collection = await bookmarks.getCollection();
    await collection.drop();
  } catch (e) {
    throw e;
  } finally {
    await closeMongoDB();
  }
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
    await bookmarks.remove(fakeData.slice(1));
    const data = await bookmarks.getAll();
    verifyData(data, fakeData.slice(0, 1));
  });
});

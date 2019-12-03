const createTestCollection = require('./utils/createTestCollection');
const PttUsersCollection = require('../db/PttUsersCollection');

function verifyData(dbOutput, fakeData) {
  expect(dbOutput.length).toBe(fakeData.length);
  dbOutput.forEach(user => {
    expect(fakeData.includes(user.id)).toBe(true);
  });
}

const fakeData = [ 'abc', 'def', 'ijk' ];

let pttUsers = null;
let testTarget = null;

beforeAll(async function () {
  testTarget = await createTestCollection(PttUsersCollection);
  pttUsers = testTarget.collection;
});

afterAll(function () {
  return testTarget.destroy();
});

describe('PttUsersCollection', () => {
  it('should save ptt users', async () => {
    await pttUsers.save(fakeData);
    const data = await pttUsers.getAll();
    verifyData(data, fakeData);
  });

  // NOTICE: Bad smell, this test relies on the saved data from the above test.
  // This is faster but should refactor once tests get complicated.
  it('should remove ptt users', async () => {
    await pttUsers.remove([ fakeData[1] ]);
    const data = await pttUsers.getAll();
    verifyData(data, [ fakeData[0], fakeData[2] ]);
  });
});

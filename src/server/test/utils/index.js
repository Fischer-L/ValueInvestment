function verifyEmptyArray(arr) {
  expect(JSON.stringify(arr)).toBe('[]');
}

function verifyNoteDta(dataActual, dataExpected) {
  expect(dataActual.length).toBe(dataExpected.length);
  dataExpected.sort((a, b) => a.id.localeCompare(b.id));
  dataActual.sort((a, b) => a.id.localeCompare(b.id));
  dataActual.forEach((actual, i) => {
    expect(actual.id).toBe(dataExpected[i].id);
    expect(actual.lastUpdateTime).toBeGreaterThanOrEqual(actual.notes[actual.notes.length - 1].createTime);

    const actualNotes = actual.notes;
    const expectedNotes = dataExpected[i].notes;

    expect(actualNotes.length).toBe(expectedNotes.length);

    actualNotes.forEach((n, j) => {
      Object.keys(n).forEach(key => expect(n[key]).toEqual(expectedNotes[j][key]));
    });
  });
}

module.exports = { verifyEmptyArray, verifyNoteDta };

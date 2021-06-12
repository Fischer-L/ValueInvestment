function verifyObjectsExactly(objActual, objExpected) {
  if (!objActual && !objExpected) {
    return;
  }
  expect(objActual).toMatchObject(objExpected);
  expect(objExpected).toMatchObject(objActual);
}

function verifyEmptyArray(arr) {
  expect(JSON.stringify(arr)).toBe('[]');
}

function verifyNotes(notesActual, notesExpected) {
  expect(notesActual.length).toBe(notesExpected.length);
  notesActual.forEach((n, j) => {
    Object.keys(n).forEach(key => expect(n[key]).toEqual(notesExpected[j][key]));
  });
}

function verifyNoteData(dataActual, dataExpected, allowEmptyNoteBody) {
  expect(dataActual.length).toBe(dataExpected.length);

  dataExpected.sort((a, b) => a.id.localeCompare(b.id));
  dataActual.sort((a, b) => a.id.localeCompare(b.id));

  dataActual.forEach((actual, i) => {
    expect(actual.id).toBe(dataExpected[i].id);

    if (allowEmptyNoteBody) {
      expect(actual.lastUpdateTime).toBeGreaterThan(0);
      verifyEmptyArray(actual.notes);
    } else {
      expect(actual.lastUpdateTime).toBeGreaterThanOrEqual(actual.notes[actual.notes.length - 1].createTime);
      verifyNotes(actual.notes, dataExpected[i].notes);
    }

    verifyObjectsExactly(actual.noteMeta, dataExpected[i].noteMeta);
  });
}

module.exports = { verifyObjectsExactly, verifyEmptyArray, verifyNoteData, verifyNotes };

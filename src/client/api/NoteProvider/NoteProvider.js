import { apiClient } from '@/api/index';

const clone = data => data && JSON.parse(JSON.stringify(data));

class NoteProvider {
  constructor() {
    this._className = this.constructor.name;
    this._noteData = {};
    this._createPromises = {};
    this._ongoingPromises = {};
  }

  _normalizeCreationPayload(payload) { // eslint-disable-line
    throw new Error(`${this._className} should implement _normalizeCreationPayload which returns id and data for creation`);
  }

  _normalizeId(id) { // eslint-disable-line
    throw new Error(`${this._className} should implement _normalizeId`);
  }

  async _create(apiClient, id, data) { // eslint-disable-line
    throw new Error(`${this._className} should implement _create which returns newly created note data`);
  }

  async _get(apiClient, id) { // eslint-disable-line
    throw new Error(`${this._className} should implement _get which returns fetched note data`);
  }

  async _addNote(apiClient, id, note) { // eslint-disable-line
    throw new Error(`${this._className} should implement _addNote which returns newly added note`);
  }

  async _updateNote(apiClient, id, note) { // eslint-disable-line
    throw new Error(`${this._className} should implement _updateNote which returns updated note`);
  }

  async _deleteNote(apiClient, id, data) { // eslint-disable-line
    throw new Error(`${this._className} should implement _deleteNote`);
  }

  async _clear(apiClient, id) { // eslint-disable-line
    throw new Error(`${this._className} should implement _clear`);
  }

  _findNoteIndex(id, note) {
    if (this._noteData[id] && this._noteData[id].notes) {
      return this._noteData[id].notes.findIndex(currentNote => currentNote.createTime === note.createTime);
    }
    return -1;
  }

  async create(payload) {
    const { id, data } = payload ? this._normalizeCreationPayload(payload) : {};
    if (!id || !data) {
      throw new Error(`Create ${this._className} note with invalid payload = ${JSON.stringify(payload)}`);
    }

    if (this._createPromises[id]) {
      console.warn(`Double create ${this._className} note: id, data = ${id}, ${JSON.stringify(data)}`);
      await this._createPromises[id];
      return id;
    }

    const result = await this.get(id);
    if (result) {
      console.warn(`Create an existing ${this._className} note: id, data = ${id}, ${JSON.stringify(data)}`);
      return id;
    }

    try {
      this._createPromises[id] = this._create(apiClient, id, clone(data));
      const noteData = await this._createPromises[id];
      this._noteData[id] = noteData;
      return id;
    } catch (e) {
      this._createPromises[id] = null;
      console.error(e);
      throw e;
    }
  }

  async get(id) {
    if (!id) {
      throw new Error(`Get ${this._className} note with invalid id = ${id}`);
    }
    id = this._normalizeId(id);

    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }

    if (!this._noteData[id]) {
      try {
        this._ongoingPromises[id] = this._get(apiClient, id);
        const noteData = await this._ongoingPromises[id];
        if (noteData) {
          this._noteData[id] = clone(noteData);
          this._noteData[id].notes.sort((a, b) => b.createTime - a.createTime);
        }
      } catch (e) {
        console.error(e);
      }
      this._ongoingPromises[id] = null;
    }
    return this._noteData[id] ? clone(this._noteData[id]) : null;
  }

  async addNote(id, note) {
    if (!id || !note) {
      throw new Error(`Add ${this._className} note with invalid id, note = ${id}, ${JSON.stringify(note)}`);
    }
    id = this._normalizeId(id);

    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }

    if (!this._noteData[id]) {
      throw new Error(`Add note for an unknown ${this._className} note: ${id}`);
    }

    try {
      this._ongoingPromises[id] = this._addNote(apiClient, id, clone(note));
      const noteAdded = await this._ongoingPromises[id];
      this._noteData[id].notes.unshift(noteAdded);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this._ongoingPromises[id] = null;
    }
  }

  async updateNote(id, note) {
    if (!id || !note) {
      throw new Error(`Update ${this._className} note with invalid id, note = ${id}, ${JSON.stringify(note)}`);
    }
    id = this._normalizeId(id);

    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }

    if (!this._noteData[id]) {
      throw new Error(`Update note for an unknown ${this._className} note: ${id}`);
    }

    const i = this._findNoteIndex(id, note);
    if (i < 0) {
      throw new Error(`Update an unknown note: id, note = ${id}, ${JSON.stringify(note)}`);
    }

    try {
      this._ongoingPromises[id] = this._updateNote(apiClient, id, clone(note));
      const noteUpdated = await this._ongoingPromises[id];
      this._noteData[id].notes[i] = noteUpdated;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this._ongoingPromises[id] = null;
    }
  }

  async deleteNote(id, note) {
    if (!id || !note) {
      console.warn(`Delete ${this._className} note with invalid id, note = ${id}, ${JSON.stringify(note)}`);
      return;
    }
    id = this._normalizeId(id);

    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }

    if (!this._noteData[id]) {
      console.warn(`Delete note for an unknown ${this._className} note: ${id}`);
      return;
    }

    const i = this._findNoteIndex(id, note);
    if (i < 0) {
      throw new Error(`Delete an unknown ${this._className} note: id, note = ${id}, ${JSON.stringify(note)}`);
    } else if (this._noteData[id].notes.length === 1) {
      return this.clear(id);
    }

    try {
      this._ongoingPromises[id] = this._deleteNote(apiClient, id, clone(note));
      await this._ongoingPromises[id];
      this._noteData[id].notes.splice(i, 1);
    } catch (e) {
      console.error(e);
    } finally {
      this._ongoingPromises[id] = null;
    }
  }

  async clear(id) {
    if (!id) {
      console.warn(`Clear ${this._className} note with invalid id = ${id}`);
      return;
    }
    id = this._normalizeId(id);
    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }

    if (!this._noteData[id]) {
      console.warn(`Clear note for an unknown ${this._className} note: ${id}`);
    }

    try {
      this._ongoingPromises[id] = this._clear(apiClient, id);
      await this._ongoingPromises[id];
      this._createPromises[id] = this._noteData[id] = null;
    } catch (e) {
      console.error(e);
    } finally {
      this._ongoingPromises[id] = null;
    }
  }
}

export default NoteProvider;

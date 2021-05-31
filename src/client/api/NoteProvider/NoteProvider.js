import { apiClient } from '@/api/index';

const clone = data => data && JSON.parse(JSON.stringify(data));

class NoteProvider {
  constructor() {
    this._className = this.constructor.name;
    this._noteData = {};
    this._createPromises = {};
    this._ongoingPromises = {};
  }

  _normalizeId(id) { // eslint-disable-line
    throw new Error(`${this._className} should implement _normalizeId`);
  }

  async _create(apiClient, id, data) { // eslint-disable-line
    throw new Error(`${this._className} should implement _create`);
  }

  async _get(apiClient, id) { // eslint-disable-line
    throw new Error(`${this._className} should implement _get`);
  }

  async _addNote(apiClient, id, data) { // eslint-disable-line
    throw new Error(`${this._className} should implement _addNote`);
  }

  async _updateNote(apiClient, id, data) { // eslint-disable-line
    throw new Error(`${this._className} should implement _updateNote`);
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

  async create(id, data) {
    if (!id || !data) {
      throw new Error(`Create ${this._className} note with invalid id, data = ${id}, ${JSON.stringify(data)}`);
    }
    id = this._normalizeId(id);

    const noteExist = this._createPromises[id] || await this.get(id);
    if (noteExist) {
      console.warn(`Double create ${this._className} note: id, data = ${id}, ${JSON.stringify(data)}`);
      return this._createPromises[id];
    }

    try {
      this._createPromises[id] = this._create(apiClient, id, clone(data));
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
        this._ongoingPromises[id] = await this._get(apiClient, id);
      } catch (e) {
        console.error(e);
      }

      this._ongoingPromises[id] = null;

      if (this._noteData[id]) {
        this._noteData[id].notes.sort((a, b) => b.createTime - a.createTime);
      }
    }
    return this._noteData[id] ? clone(this._noteData[id]) : null;
  }

  async addNote(id, data) {
    if (!id || !data) {
      throw new Error(`Add ${this._className} note with invalid id, data = ${id}, ${JSON.stringify(data)}`);
    }
    id = this._normalizeId(id);

    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }

    if (!this._noteData[id]) {
      throw new Error(`Add note for an unknown ${this._className} note: ${id}`);
    }

    try {
      this._ongoingPromises[id] = this._addNote(apiClient, id, clone(data));
      await this._ongoingPromises[id];
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this._ongoingPromises[id] = null;
    }
  }


  async updateNote(id, data) {
    if (!id || !data) {
      throw new Error(`Update ${this._className} note with invalid id, data = ${id}, ${JSON.stringify(data)}`);
    }
    id = this._normalizeId(id);

    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }

    if (!this._noteData[id]) {
      throw new Error(`Update note for an unknown ${this._className} note: ${id}`);
    }

    try {
      this._ongoingPromises[id] = this._updateNote(apiClient, id, clone(data));
      await this._ongoingPromises[id];
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this._ongoingPromises[id] = null;
    }
  }

  async deleteNote(id, data) {
    if (!id || !data) {
      console.warn(`Delete ${this._className} note with invalid id, data = ${id}, ${JSON.stringify(data)}`);
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

    try {
      this._ongoingPromises[id] = this._deleteNote(apiClient, id, clone(data));
      await this._ongoingPromises[id];
    } catch (e) {
      console.warn(e);
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
      console.warn(`Delete note for an unknown ${this._className} note: ${id}`);
      return;
    }

    try {
      this._ongoingPromises[id] = this._clear(apiClient, id);
      await this._ongoingPromises[id];
    } catch (e) {
      console.error(e);
    } finally {
      this._ongoingPromises[id] = null;
    }
  }
}

export default NoteProvider;

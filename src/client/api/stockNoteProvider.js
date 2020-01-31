import { apiClient } from '@/api/index';

const clone = data => data && JSON.parse(JSON.stringify(data));

const stockNoteProvider = {

  _stockNotes: {},

  _createPromises: {},
  _ongoingPromises: {},

  async create(id, note) {
    if (!id || !note) {
      throw new Error(`Create a stock note with invalid id, note = ${id}, ${JSON.stringify(note)}`);
    }

    const stockNote = await this.get(id);
    if (this._createPromises[id] || stockNote) {
      console.warn(`Double create stock note: ${id}`);
      return this._createPromises[id];
    }

    try {
      note = clone(note);
      note.createTime = Date.now();
      this._createPromises[id] = apiClient.put('/stocknote', { payload: { id, note } });
      await this._createPromises[id];
      this._stockNotes[id] = {
        id,
        notes: [ note ],
      };
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this._createPromises[id] = null;
    }
  },

  async get(id) {
    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }
    if (!this._stockNotes[id]) {
      try {
        this._ongoingPromises[id] = apiClient.get(`/stocknote/${id}`);
        const { data } = await this._ongoingPromises[id];
        this._stockNotes[id] = data;
      } catch (e) {
        console.error(e);
      }
      this._ongoingPromises[id] = null;
    }
    return clone(this._stockNotes[id]);
  },

  async addNote(id, note) {
    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }
    if (!this._stockNotes[id]) {
      throw new Error(`Add a note for an unknown stock note: ${id}`);
    }

    try {
      note = clone(note);
      note.createTime = Date.now();
      this._ongoingPromises[id] = apiClient.post(`/stocknote/${id}/note`, { action: 'add', payload: { note } });
      await this._ongoingPromises[id];
      this._stockNotes[id].notes.push(note);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this._ongoingPromises[id] = null;
    }
  },

  async updateNote(id, note) {
    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }
    if (!this._stockNotes[id]) {
      throw new Error(`Update an note for an unknown stock note: ${id}`);
    }

    try {
      const i = this._stockNotes[id].notes.findIndex(currentNote => currentNote.createTime === note.createTime);
      if (i < 0) {
        throw new Error(`Update an unknown note: ${note}`);
      }
      note = clone(note);
      this._ongoingPromises[id] = apiClient.post(`/stocknote/${id}/note`, { action: 'update', payload: { note } });
      await this._ongoingPromises[id];
      this._stockNotes[id].notes[i] = note;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this._ongoingPromises[id] = null;
    }
  },

  async deleteNote(id, note) {
    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }
    if (!this._stockNotes[id]) {
      throw new Error(`Delete an note for an unknown stock note: ${id}`);
    }

    try {
      const notes = this._stockNotes[id].notes;
      const i = notes.findIndex(currentNote => currentNote.createTime === note.createTime);
      if (i < 0) {
        throw new Error(`Delete an unknown note: ${note}`);
      }
      this._ongoingPromises[id] = apiClient.post(`/stocknote/${id}/note`, { action: 'delete', payload: { note } });
      await this._ongoingPromises[id];
      this._stockNotes[id].notes.splice(i, 1);
    } catch (e) {
      console.error(e);
    } finally {
      this._ongoingPromises[id] = null;
    }
  },

  async remove(id) {
    if (this._ongoingPromises[id]) {
      await this._ongoingPromises[id];
    }
    if (!this._stockNotes[id]) {
      console.warn(`Remove an unknown stock note: ${id}`);
      return;
    }

    try {
      this._ongoingPromises[id] = apiClient.delete(`/stocknote/${id}`);
      await this._ongoingPromises[id].then(() => {
        this._stockNotes[id] = null;
      });
    } catch (e) {
      console.error(e);
    }
    this._ongoingPromises[id] = null;
  },
};

export default stockNoteProvider;

import { apiClient } from '@/api/index';

const clone = data => data && JSON.parse(JSON.stringify(data));

const stockNoteProvider = {

  _stockNotes: {},

  _createPromises: {},
  _ongoingPromises: {},

  async create(data) {
    if (!data || !data.id || !data.notes || data.notes.length === 0) {
      throw new Error(`Cannot create an invalid stock note: ${JSON.stringify(data)}`);
    }

    const stockNote = await this.get(data.id);
    if (this._createPromises[data.id] || stockNote) {
      console.warn(`Double create stock note: ${JSON.stringify(data)}`);
      return this._createPromises[data.id];
    }
    try {
      data = clone(data);
      data.notes.sort((a, b) => b.createTime - a.createTime);
      this._createPromises[data.id] = apiClient.put('/stocknote', { payload: data });
      await this._createPromises[data.id].then(() => {
        this._stockNotes[data.id] = data;
      });
    } catch (e) {
      console.error(e);
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
        if (data) {
          data.notes.sort((a, b) => b.createTime - a.createTime);
          this._stockNotes[id] = data;
        }
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
      const notes = clone(this._stockNotes[id].notes);
      notes.unshift({ ...clone(note), createTime: Date.now() });
      this._ongoingPromises[id] = apiClient.post(`/stocknote/${id}`, { payload: { notes } });
      await this._ongoingPromises[id].then(() => {
        this._stockNotes[id].notes = notes;
      });
    } catch (e) {
      console.error(e);
    }
    this._ongoingPromises[id] = null;
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

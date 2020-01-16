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
      const payload = {
        id,
        notes: [{ ...clone(note), createTime: Date.now() }],
      };
      this._createPromises[id] = apiClient.put('/stocknote', { payload });
      await this._createPromises[id];
      this._stockNotes[id] = payload;
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
      const notes = clone(this._stockNotes[id].notes);
      notes.push({ ...clone(note), createTime: Date.now() });
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

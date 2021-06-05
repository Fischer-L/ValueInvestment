import NoteProvider from '@/api/NoteProvider/NoteProvider';

class StockNoteProvider extends NoteProvider {

  _normalizeId(id) {
    return id.toUpperCase();
  }

  async _create(apiClient, id, note) {
    note.createTime = Date.now();
    await apiClient.put('/stocknote', { payload: { id, note } });
    this._noteData[id] = {
      id,
      notes: [ note ],
    };
  }

  async _get(apiClient, id) {
    const { data } = await apiClient.get(`/stocknote/${id}`);
    if (data) {
      this._noteData[id] = data;
    }
    return this._noteData[id];
  }

  async _addNote(apiClient, id, note) {
    note.createTime = Date.now();
    await apiClient.post(`/stocknote/${id}/note`, { action: 'add', payload: { note } });
    this._noteData[id].notes.unshift(note);
  }

  async _updateNote(apiClient, id, note) {
    const i = this._findNoteIndex(id, note);
    if (i < 0) {
      throw new Error(`Update an unknown note: id, note = ${id}, ${JSON.stringify(note)}`);
    }
    await apiClient.post(`/stocknote/${id}/note`, { action: 'update', payload: { note } });
    this._noteData[id].notes[i] = note;
  }

  async _deleteNote(apiClient, id, note) {
    const i = this._findNoteIndex(id, note);
    if (i < 0) {
      throw new Error(`Delete an unknown note: id, note = ${id}, ${JSON.stringify(note)}`);
    } else if (this._noteData[id].notes.length === 1) {
      return this.clear(id);
    }
    await apiClient.post(`/stocknote/${id}/note`, { action: 'delete', payload: { note } });
    this._noteData[id].notes.splice(i, 1);
  }

  async _clear(apiClient, id) {
    await apiClient.delete(`/stocknote/${id}`);
    this._noteData[id] = null;
  }
}

const stockNoteProvider = new StockNoteProvider();

export default stockNoteProvider;

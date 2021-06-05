import NoteProvider from '@/api/NoteProvider/NoteProvider';

class StockNoteProvider extends NoteProvider {

  _normalizeId(id) {
    return id.toUpperCase();
  }

  _normalizeCreationPayload({ stockId, note }) {
    return {
      id: stockId && this._normalizeId(stockId),
      data: note,
    };
  }

  async _create(apiClient, id, note) {
    note.createTime = Date.now();
    await apiClient.put('/stocknote', { payload: { id, note } });
    return {
      id,
      notes: [ note ],
    };
  }

  async _get(apiClient, id) {
    const { data } = await apiClient.get(`/stocknote/${id}`);
    return data || null;
  }

  async _addNote(apiClient, id, note) {
    note.createTime = Date.now();
    await apiClient.post(`/stocknote/${id}/note`, { action: 'add', payload: { note } });
    return note;
  }

  async _updateNote(apiClient, id, note) {
    await apiClient.post(`/stocknote/${id}/note`, { action: 'update', payload: { note } });
    return note;
  }

  async _deleteNote(apiClient, id, note) {
    return apiClient.post(`/stocknote/${id}/note`, { action: 'delete', payload: { note } });
  }

  async _clear(apiClient, id) {
    return apiClient.delete(`/stocknote/${id}`);
  }
}

const stockNoteProvider = new StockNoteProvider();

export default stockNoteProvider;

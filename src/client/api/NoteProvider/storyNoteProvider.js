import NoteProvider from '@/api/NoteProvider/NoteProvider';

const ID_PREFIX = '_ID_';

export class StoryNoteProvider extends NoteProvider {

  _normalizeId(id) {
    return id.startsWith(ID_PREFIX) ? id : ID_PREFIX + encodeURIComponent(id);
  }

  _normalizeCreationPayload({ note, noteMeta }) {
    return {
      id: noteMeta && noteMeta.title && this._normalizeId(noteMeta.title),
      data: {
        note, noteMeta,
      },
    };
  }

  async _create(apiClient, id, { note, noteMeta }) {
    note.createTime = Date.now();
    await apiClient.put('/storynote', { payload: { id, note, noteMeta } });
    return {
      id,
      notes: [ note ],
      noteMeta,
    };
  }

  async _get(apiClient, id) {
    const { data } = await apiClient.get(`/storynote/${id}`);
    return data || null;
  }

  async _addNote(apiClient, id, note) {
    note.createTime = Date.now();
    await apiClient.post(`/storynote/${id}/note`, { action: 'add', payload: { note } });
    return note;
  }

  async _updateNote(apiClient, id, note) {
    await apiClient.post(`/storynote/${id}/note`, { action: 'update', payload: { note } });
    return note;
  }

  async _deleteNote(apiClient, id, note) {
    return apiClient.post(`/storynote/${id}/note`, { action: 'delete', payload: { note } });
  }

  async _clear(apiClient, id) {
    return apiClient.delete(`/storynote/${id}`);
  }
}

const storyNoteProvider = new StoryNoteProvider();

export default storyNoteProvider;

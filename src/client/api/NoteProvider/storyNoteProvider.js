import NoteProvider from '@/api/NoteProvider/NoteProvider';

const ID_PREFIX = '_ID_';

export class StoryNoteProvider extends NoteProvider {

  _normalizeId(id) {
    if (id.startsWith(ID_PREFIX)) {
      return id;
    }
    // From: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return ID_PREFIX + hash;
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
    if (note) {
      note.createTime = Date.now();
    }
    await apiClient.put('/storynote', { payload: { id, note, noteMeta } });
    return {
      id,
      notes: note ? [ note ] : [],
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

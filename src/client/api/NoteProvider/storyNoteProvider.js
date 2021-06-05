import NoteProvider from '@/api/NoteProvider/NoteProvider';

const ID_PREFIX = '_ID_';

export class StoryNoteProvider extends NoteProvider {

  static hashId(id) {
    return id.startsWith(ID_PREFIX) ? id : ID_PREFIX + encodeURIComponent(id);
  }

  _normalizeId(id) {
    return StoryNoteProvider.hashId(id);
  }

  async _create(apiClient, id, { note, noteMeta }) {
    note.createTime = Date.now();
    await apiClient.put('/storynote', { payload: { id, note, noteMeta } });
    this._noteData[id] = {
      id,
      notes: [ note ],
      noteMeta,
    };
  }

  async _get(apiClient, id) {
    const { data } = await apiClient.get(`/storynote/${id}`);
    if (data) {
      this._noteData[id] = data;
    }
    return this._noteData[id];
  }

  async _addNote(apiClient, id, note) {
    note.createTime = Date.now();
    await apiClient.post(`/storynote/${id}/note`, { action: 'add', payload: { note } });
    this._noteData[id].notes.unshift(note);
  }

  async _updateNote(apiClient, id, note) {
    const i = this._findNoteIndex(id, note);
    if (i < 0) {
      throw new Error(`Update an unknown note: id, note = ${id}, ${JSON.stringify(note)}`);
    }
    await apiClient.post(`/storynote/${id}/note`, { action: 'update', payload: { note } });
    this._noteData[id].notes[i] = note;
  }

  async _deleteNote(apiClient, id, note) {
    const i = this._findNoteIndex(id, note);
    if (i < 0) {
      throw new Error(`Delete an unknown note: id, note = ${id}, ${JSON.stringify(note)}`);
    } else if (this._noteData[id].notes.length === 1) {
      return this.clear(id);
    }
    await apiClient.post(`/storynote/${id}/note`, { action: 'delete', payload: { note } });
    this._noteData[id].notes.splice(i, 1);
  }

  async _clear(apiClient, id) {
    await apiClient.delete(`/storynote/${id}`);
    this._noteData[id] = null;
  }
}

const storyNoteProvider = new StoryNoteProvider();

export default storyNoteProvider;

import React from 'react';
import PropTypes from 'prop-types';

import { show } from '@/utils/showDisplay';
import stockNoteProvider from '@/api/stockNoteProvider';
import Loading from '@/components/Loading';
import ErrorDuck from '@/components/ErrorDuck';
import Prompt, { ACTION } from '@/components/Prompt';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import { Note, NewNoteElem } from './utilComponents';

import '@/css/NoteBoard.scss';

/* eslint-disable */
const getNoteTemplate = () => ({
  trade: {
    comment:
      '- 獲利價, 進場價, 轉利價, 風報比, 報酬率% \n' +
      '- 買進理由: \n' +
      '- 賣出理由: ',
  },
  value: {
    comment:
      '- By PE: \n' +
      '  - Good: \n' +
      '  - Fair: \n' +
      '  - Bad: \n' +
      '\n' +
      '- By Dividend: ',
  },
  fundamentals: {
    comment:
      '- 月營收: \n' +
      '- 毛利: \n' +
      '- 營利: \n' +
      '- 公司: \n' +
      '- 法人: ',
  },
  technicals: {
    comment:
      '- 60分K: \n' +
      '- 日K: \n' +
      '- 週K: \n' +
      '- 月K: ',
  },
  chips: {
    comment:
      '- 外資: \n' +
      '- 投信: \n' +
      '- 大戶: \n' +
      '- 散戶: \n' +
      '- 融資: \n' +
      '- 融券: ',
  },
});
/* eslint-enable */

const defaultState = () => ({
  stockId: null,
  stockNote: null,
  noteToEdit: null,
  noteToDelete: null,

  error: null,
  loading: false,

  newNoteMode: false,
  defaultNote: null,
});

class NoteBoard extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = defaultState();

    this.loadStockNote = async (stockId, forceLoad) => {
      if (!forceLoad && (this.state.loading || stockId === this.state.stockId)) {
        return;
      }
      this.setState({ ...defaultState(), stockId, loading: true });
      try {
        const stockNote = await stockNoteProvider.get(stockId);
        if (stockNote) {
          stockNote.notes && stockNote.notes.sort((a, b) => b.createTime - a.createTime);
          this.setState({ stockNote });
        }
      } catch (error) {
        this.setState({ error });
      }
      this.setState({ loading: false });
    };

    this.closeNewNoteMode = () => {
      this.setState({ newNoteMode: false, defaultNote: null });
    };

    this.openNewNoteMode = this.onClickDo((e, payload) => {
      const defaultNote = (payload && payload.defaultNote) || getNoteTemplate();
      this.setState({ newNoteMode: true, defaultNote });
    });

    this.saveNote = async ({ newNote }) => {
      if (this.state.loading || !newNote) {
        return;
      }

      this.setState({ error: null, loading: true });
      try {
        if (this.state.stockNote) {
          await stockNoteProvider.addNote(this.state.stockId, newNote);
        } else {
          await stockNoteProvider.create(this.state.stockId, newNote);
        }
        this.closeNewNoteMode();
        this.loadStockNote(this.state.stockId, true);
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    this.updateNote = async ({ newNote, originalNote }) => {
      if (!newNote || !originalNote.createTime) {
        return;
      }

      this.setState({ error: null, loading: true });
      try {
        newNote.createTime = originalNote.createTime;
        await stockNoteProvider.updateNote(this.state.stockId, newNote);
        this.loadStockNote(this.state.stockId, true);
        this.closeEditNote();
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    this.copyNote = ({ originalNote }) => {
      if (originalNote) {
        this.openNewNoteMode(null, { defaultNote: originalNote });
      }
    };

    this.editNote = ({ originalNote }) => {
      if (originalNote && !this.state.loading) {
        this.setState({ noteToEdit: originalNote });
      }
    };

    this.promptDeleteNote = ({ originalNote }) => {
      if (originalNote) {
        this.setState({ noteToDelete: originalNote });
      }
    };

    this.closeEditNote = () => this.setState({ noteToEdit: null });

    this.deleteNote = async noteToDelete => {
      if (!noteToDelete) {
        return;
      }
      try {
        this.setState({ error: null, loading: true });
        await stockNoteProvider.deleteNote(this.state.stockId, noteToDelete);
        this.loadStockNote(this.state.stockId, true);
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };
  }

  renderNotes() {
    const { copyNote, editNote, promptDeleteNote, updateNote, closeEditNote } = this;
    const { stockNote, noteToEdit } = this.state;
    if (stockNote) {
      return stockNote.notes.map(note => {
        const editMode = !!(noteToEdit && noteToEdit.createTime === note.createTime);
        return (
          <section className="note" key={note.createTime}>
            <Note
              note={note}
              editMode={editMode}
              whenSaveNote={updateNote}
              whenCancelEditNote={closeEditNote}
              whenCopyNote={copyNote}
              whenEditNote={editNote}
              whenDeleteNote={promptDeleteNote}
            />
          </section>
        );
      });
    }
    return null;
  }

  renderNewNoteElem() {
    const { newNoteMode, defaultNote, noteToEdit } = this.state;
    const { saveNote, openNewNoteMode, closeNewNoteMode } = this;
    if (noteToEdit) {
      return null;
    }
    return (
      <NewNoteElem
        key="NewNoteElem"
        newNoteMode={newNoteMode}
        defaultNote={defaultNote}
        whenSaveNote={saveNote}
        whenCancelNewNote={closeNewNoteMode}
        whenOpenNewNoteMode={openNewNoteMode}
      />
    );
  }

  renderDeleteNotePrompt() {
    if (!this.state.noteToDelete) {
      return null;
    }
    const onClose = ({ action }) => {
      if (action === ACTION.OK) {
        this.deleteNote(this.state.noteToDelete);
      }
      this.setState({ noteToDelete: null });
    };
    return <Prompt msg="Do you really want to delete this note?" onClose={onClose} />;
  }

  render() {
    const { error, loading } = this.state;

    const errorMsg = error ? error.toString() : '';

    const content = [
      this.renderNewNoteElem(),
      this.renderNotes(),
    ];

    return (
      <section className="noteBoard">
        <div style={show(loading)}><Loading /></div>
        <div style={show(!loading && errorMsg)}>{ ErrorDuck(errorMsg) }</div>
        <div style={show(!loading)}>{ content }</div>
        { this.renderDeleteNotePrompt() }
      </section>
    );
  }

  componentDidMount() {
    this.loadStockNote(this.props.stockId);
  }

  componentDidUpdate() {
    this.loadStockNote(this.props.stockId);
  }
}

NoteBoard.propTypes = {
  stockId: PropTypes.string.isRequired,
};

export default NoteBoard;

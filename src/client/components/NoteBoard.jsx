import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Label, Icon, Button } from 'semantic-ui-react';

import showDisplay from '@/utils/showDisplay';
import stockNoteProvider from '@/api/stockNoteProvider';
import Loading from '@/components/Loading';
import ErrorDuck from '@/components/ErrorDuck';
import Prompt, { ACTION } from '@/components/Prompt';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import '@/css/NoteBoard.scss';

const show = showDisplay;
const commentOf = data => (data && data.comment ? data.comment : '');
const toDateInTW = time => (time ? (new Date(time + 8 * 60 * 60 * 1000)).toISOString().split('T')[0] : '');

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
      '- 主力: \n' +
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

    this.closeNewNoteMode = this.onClickDo(() => {
      this.setState({ newNoteMode: false, defaultNote: null });
    });

    this.openNewNoteMode = this.onClickDo((e, payload) => {
      const defaultNote = (payload && payload.defaultNote) || getNoteTemplate();
      this.setState({ newNoteMode: true, defaultNote });
    });

    this.extraNoteFromDOM = noteRef => {
      const note = [ 'trade', 'value', 'story', 'fundamentals', 'technicals', 'chips' ]
        .map(key => [ key, noteRef.current.querySelector(`textarea.note-${key}`).value ])
        .filter(([ key, comment ]) => !!comment); // eslint-disable-line no-unused-vars
      if (note.length) {
        return note.reduce((_note, [ key, comment ]) => {
          _note[key] = { comment };
          return _note;
        }, {});
      }
      return null;
    };

    this.saveNote = async (noteRef) => {
      if (this.state.loading) {
        return;
      }

      const note = this.extraNoteFromDOM(noteRef);
      if (!note) {
        return;
      }

      this.setState({ error: null, loading: true });
      try {
        if (this.state.stockNote) {
          await stockNoteProvider.addNote(this.state.stockId, note);
        } else {
          await stockNoteProvider.create(this.state.stockId, note);
        }
        this.closeNewNoteMode();
        this.loadStockNote(this.state.stockId, true);
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    this.updateNote = async (noteRef, originalNote) => {
      const note = this.extraNoteFromDOM(noteRef);
      if (!note || !originalNote.createTime) {
        return;
      }

      this.setState({ error: null, loading: true });
      try {
        note.createTime = originalNote.createTime;
        await stockNoteProvider.updateNote(this.state.stockId, note);
        this.loadStockNote(this.state.stockId, true);
        this.closeEditNote();
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    this.copyNote = this.onClickDo(e => {
      if (!e.target.dataset.note) return;
      const defaultNote = JSON.parse(e.target.dataset.note);
      this.openNewNoteMode(null, { defaultNote });
    });

    this.editNote = this.onClickDo(e => {
      if (e.target.dataset.note && !this.state.loading) {
        this.setState({ noteToEdit: JSON.parse(e.target.dataset.note) });
      }
    });

    this.closeEditNote = () => this.setState({ noteToEdit: null });

    this.promptDeleteNote = this.onClickDo(async e => {
      if (e.target.dataset.note) {
        this.setState({ noteToDelete: JSON.parse(e.target.dataset.note) });
      }
    });

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

  Paragraph({ texts, editMode, className }) {
    if (editMode) {
      return <textarea className={`note-pararaph--editMode ${className}`} rows="6" defaultValue={texts} />;
    }
    const lines = [];
    texts.split('\n').forEach((text, i) => lines.push(text.replace(/\s/g, '\u00A0'), <br key={i} />));
    return <p className={`note-pararaph ${className}`} style={show(texts)}>{ lines }</p>;
  }

  Comment({ header, texts, editMode, className }) {
    return (
      <div className="note-comment" style={show(editMode || texts)}>
        <Header className="note-header" as="h4">{ header }</Header>
        { this.Paragraph({ texts, editMode, className }) }
      </div>);
  }

  Note({ note = {}, copyNote, editNote, promptDeleteNote, editMode, onSave, onCancel }) {
    const dataNote = JSON.stringify(note);
    const noteRef = editMode ? React.createRef() : null;
    const onOK = editMode ? () => onSave(noteRef, note) : null;
    const { trade, value, story, fundamentals, technicals, chips, createTime } = note;
    return (
      <div ref={noteRef}>
        { editMode ? this.EditModeButtons(onOK, onCancel) : null }
        <Header className="note-header" as="h3">
          操作策略
          <Icon className="note-copyBtn" name="copy outline" size="tiny" data-note={dataNote} style={show(!editMode)} onClick={copyNote} onTouchEnd={copyNote} />
          <Icon className="note-editBtn" name="edit outline" size="tiny" data-note={dataNote} style={show(!editMode)} onClick={editNote} onTouchEnd={editNote} />
          <Icon className="note-deleteBtn" name="trash alternate outline" size="tiny" data-note={dataNote} style={show(!editMode)} onClick={promptDeleteNote} onTouchEnd={promptDeleteNote} />
          <Label className="note-date" as="span" color="orange" size="tiny" tag style={show(!editMode)}>{ toDateInTW(createTime) }</Label>
        </Header>
        { this.Paragraph({ className: 'note-trade', texts: commentOf(trade), editMode }) }
        { this.Comment({ header: '價值面', className: 'note-value', texts: commentOf(value), editMode }) }
        { this.Comment({ header: '題材面', className: 'note-story', texts: commentOf(story), editMode }) }
        { this.Comment({ header: '基本面', className: 'note-fundamentals', texts: commentOf(fundamentals), editMode }) }
        { this.Comment({ header: '技術面', className: 'note-technicals', texts: commentOf(technicals), editMode }) }
        { this.Comment({ header: '籌碼面', className: 'note-chips', texts: commentOf(chips), editMode }) }
        { editMode ? this.EditModeButtons(onOK, onCancel) : null }
      </div>
    );
  }

  Notes() {
    const { copyNote, editNote, promptDeleteNote, updateNote, closeEditNote } = this;
    const { stockNote, noteToEdit } = this.state;
    if (stockNote) {
      return stockNote.notes.map(note => {
        const onSave = updateNote;
        const onCancel = closeEditNote;
        const editMode = !!(noteToEdit && noteToEdit.createTime === note.createTime);
        return <section className="note" key={note.createTime}>{ this.Note({ note, copyNote, editNote, promptDeleteNote, editMode, onSave, onCancel }) }</section>;
      });
    }
    return null;
  }

  EditModeButtons(onOK, onCancel) {
    const onClickOK = this.onClickDo(onOK);
    const onClickCancel = this.onClickDo(onCancel);
    return (
      <div>
        <Divider clearing hidden />
        <Button.Group className="noteBoard-editModeBtns">
          <Button className="noteBoard-cancelBtn" onClick={onClickCancel} onTouchEnd={onClickCancel}>Cancel</Button>
          <Button.Or />
          <Button positive onClick={onClickOK} onTouchEnd={onClickOK}>Save</Button>
        </Button.Group>
        <Divider clearing hidden />
      </div>);
  }

  NewNoteElem() {
    const { newNoteMode, defaultNote, noteToEdit } = this.state;
    const { saveNote, openNewNoteMode, closeNewNoteMode } = this;
    if (noteToEdit) {
      return null;
    }
    if (!newNoteMode) {
      return (
        <section className="note" key="NewNoteElem">
          <Icon className="noteBoard-addBtn" name="add" size="large" onClick={openNewNoteMode} onTouchEnd={openNewNoteMode} />
          <Divider clearing hidden />
        </section>
      );
    }
    return (
      <section className="note" key="NewNoteElem">
        { this.Note({ editMode: newNoteMode, onSave: saveNote, onCancel: closeNewNoteMode, note: defaultNote }) }
      </section>
    );
  }

  DeleteNotePrompt() {
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
      this.NewNoteElem(),
      this.Notes(),
    ];

    return (
      <section className="noteBoard">
        <div style={show(loading)}>{ Loading() }</div>
        <div style={show(!loading && errorMsg)}>{ ErrorDuck(errorMsg) }</div>
        <div style={show(!loading)}>{ content }</div>
        { this.DeleteNotePrompt() }
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

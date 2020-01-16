import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Label, Icon, Button } from 'semantic-ui-react';

import stockNoteProvider from '@/api/stockNoteProvider';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/NoteBoard.scss';

const show = _show => ({ display: _show ? '' : 'none' });
const commentOf = data => (data && data.comment ? data.comment.trim() : '');
const toDateInTW = time => (time ? (new Date(time + 8 * 60 * 60 * 1000)).toISOString().split('T')[0] : '');

class NoteBoard extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      stockId: null,
      stockNote: null,
      editMode: false,
      defaultNote: null,
    };

    this.loadStockNote = (id, forceLoad) => {
      if (!forceLoad && (this.state.loading || id === this.state.stockId)) {
        return;
      }
      this.setState({ stockId: id, loading: true });
      stockNoteProvider.get(id).then(stockNote => {
        stockNote.notes.sort((a, b) => b.createTime - a.createTime);
        this.setState({ stockNote, loading: false });
      });
    };

    this.closeEditMode = this.onClickDo(() => {
      this.setState({ editMode: false, defaultNote: null });
    });
    this.openEditMode = this.onClickDo((e, payload) => {
      this.setState({ editMode: true, defaultNote: payload && payload.defaultNote });
    });

    this.saveNote = this.onClickDo(async () => {
      if (this.state.loading) {
        return;
      }
      this.closeEditMode();
      this.setState({ loading: true });

      const note = [ 'trade', 'value', 'story', 'fundamentals', 'technicals', 'chips' ]
        .reduce((_note, key) => {
          _note[key] = { comment: document.querySelector(`textarea.note-${key}`).value };
          return _note;
        }, {});

      if (this.state.stockNote) {
        await stockNoteProvider.addNote(this.state.stockId, note);
      } else {
        await stockNoteProvider.create(this.state.stockId, note);
      }
      this.loadStockNote(this.state.stockId, true);
    });

    this.copyNote = this.onClickDo(e => {
      if (!e.target.dataset.note) return;
      const defaultNote = JSON.parse(e.target.dataset.note);
      this.openEditMode(null, { defaultNote });
    });
  }

  Paragraph({ texts, editMode, className }) {
    if (editMode) {
      return <textarea className={`note-pararaph--editMode ${className}`} rows="6" defaultValue={texts} />;
    }
    const lines = [];
    texts.split('\n').forEach((text, i) => lines.push(text, <br key={i} />));
    return <p className={`note-pararaph ${className}`} style={show(texts)}>{ lines }</p>;
  }

  Comment({ header, texts, editMode, className }) {
    return (
      <div className="note-comment" style={show(editMode || texts)}>
        <Header className="note-header" as="h4">{ header }</Header>
        { this.Paragraph({ texts, editMode, className }) }
      </div>);
  }

  Note({ editMode, copyNote, note = {} }) {
    const { trade, value, story, fundamentals, technicals, chips, createTime } = note;
    const dataNote = JSON.stringify({ trade, value, story, fundamentals, technicals, chips });
    return (
      <div>
        <Header className="note-header" as="h3">
          操作策略
          <Icon className="note-copyBtn" name="copy outline" size="tiny" data-note={dataNote} style={show(!editMode)} onClick={copyNote} onTouchEnd={copyNote} />
          <Label className="note-date" as="span" color="orange" size="tiny" tag style={show(!editMode)}>{ toDateInTW(createTime) }</Label>
        </Header>
        { this.Paragraph({ className: 'note-trade', texts: commentOf(trade), editMode }) }
        { this.Comment({ header: '價值面', className: 'note-value', texts: commentOf(value), editMode }) }
        { this.Comment({ header: '題材面', className: 'note-story', texts: commentOf(story), editMode }) }
        { this.Comment({ header: '基本面', className: 'note-fundamentals', texts: commentOf(fundamentals), editMode }) }
        { this.Comment({ header: '技術面', className: 'note-technicals', texts: commentOf(technicals), editMode }) }
        { this.Comment({ header: '籌碼面', className: 'note-chips', texts: commentOf(chips), editMode }) }
      </div>
    );
  }

  EditModeElem() {
    const { editMode, defaultNote } = this.state;
    const { saveNote, openEditMode, closeEditMode } = this;
    if (!editMode) {
      return (
        <div>
          <Icon className="noteBoard-addBtn" name="add" size="large" onClick={openEditMode} onTouchEnd={openEditMode} />
          <Divider clearing hidden />
        </div>
      );
    }
    return (
      <div>
        { this.Note({ editMode, note: defaultNote }) }
        <Divider clearing hidden />
        <Button.Group className="noteBoard-editModeBtns">
          <Button className="noteBoard-cancelBtn" onClick={closeEditMode} onTouchEnd={closeEditMode}>Cancel</Button>
          <Button.Or />
          <Button positive onClick={saveNote} onTouchEnd={saveNote}>Save</Button>
        </Button.Group>
        <Divider clearing hidden />
      </div>
    );
  }

  Notes() {
    const copyNote = this.copyNote;
    const stockNote = this.state.stockNote;
    if (stockNote) {
      return stockNote.notes.map(note => <section className="note" key={note.createTime}>{ this.Note({ note, copyNote }) }</section>);
    }
    return null;
  }

  render() {
    return (
      <section className="noteBoard">
        <section className="note">
          { (() => (this.state.loading ? <span>Loading...</span> : this.EditModeElem()))() }
        </section>
        { this.Notes() }
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

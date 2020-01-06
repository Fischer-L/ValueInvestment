import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Label, Icon, Button } from 'semantic-ui-react';

import stockNoteProvider from '@/api/stockNoteProvider';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/NoteBoard.scss';

const show = _show => ({ display: _show ? '' : 'none' });
const commentOf = data => (data && data.comment ? data.comment : '');

class NoteBoard extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      stockId: null,
      stockNote: null,
      editMode: false,
    };

    this.loadStockNote = (id, forceLoad) => {
      if (!forceLoad && (this.state.loading || id === this.state.stockId)) {
        return;
      }
      this.setState({ stockId: id, loading: true });
      stockNoteProvider.get(id).then(stockNote => {
        this.setState({ stockNote, loading: false });
      });
    };

    this.toggleEditMode = this.onClickDo(() => {
      this.setState(prevState => ({ editMode: !prevState.editMode }));
    });

    this.saveNote = this.onClickDo(async () => {
      if (this.state.loading) {
        return;
      }
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
  }

  Paragraph({ texts, editMode, className }) {
    if (editMode) {
      return <textarea className={`note-pararaph--editMode ${className}`} rows="6" defaultValue={texts} />;
    }
    return <p className={`note-pararaph ${className}`}>{ texts }</p>;
  }

  Note({ editMode, note = {} }) {
    const { trade, value, story, fundamentals, technicals, chips, createTime } = note;
    return (
      <div>
        <Header className="note-header" as="h3">
          操作策略
          <Label className="note-date" as="span" color="orange" size="tiny" tag style={show(!editMode)}>{ createTime }</Label>
        </Header>
        { this.Paragraph({ className: 'note-trade', texts: commentOf(trade), editMode }) }

        <Header className="note-header" as="h4">價值面</Header>
        { this.Paragraph({ className: 'note-value', texts: commentOf(value), editMode }) }

        <Header className="note-header" as="h4">題材面</Header>
        { this.Paragraph({ className: 'note-story', texts: commentOf(story), editMode }) }

        <Header className="note-header" as="h4">基本面</Header>
        { this.Paragraph({ className: 'note-fundamentals', texts: commentOf(fundamentals), editMode }) }

        <Header className="note-header" as="h4">技術面</Header>
        { this.Paragraph({ className: 'note-technicals', texts: commentOf(technicals), editMode }) }

        <Header className="note-header" as="h4">籌碼面</Header>
        { this.Paragraph({ className: 'note-chips', texts: commentOf(chips), editMode }) }
      </div>
    );
  }

  EditModeElem() {
    const { editMode } = this.state;
    const { saveNote, toggleEditMode } = this;
    if (!editMode) {
      return (
        <div>
          <Icon className="noteBoard-addBtn" name="add" size="large" onClick={toggleEditMode} onTouchEnd={toggleEditMode} />
          <Divider clearing hidden />
        </div>
      );
    }
    return (
      <div>
        { this.Note({ editMode }) }
        <Divider clearing hidden />
        <Button.Group className="noteBoard-editModeBtns">
          <Button className="noteBoard-cancelBtn" onClick={toggleEditMode} onTouchEnd={toggleEditMode}>Cancel</Button>
          <Button.Or />
          <Button positive onClick={saveNote} onTouchEnd={saveNote}>Save</Button>
        </Button.Group>
        <Divider clearing hidden />
      </div>
    );
  }

  Notes() {
    const stockNote = this.state.stockNote;
    if (stockNote) {
      return stockNote.notes.map(note => <section className="note" key={note.createTime}>{ this.Note({ note }) }</section>);
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

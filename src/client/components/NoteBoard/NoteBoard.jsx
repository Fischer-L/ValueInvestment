import React from 'react';
import PropTypes from 'prop-types';

import { show } from '@/utils/showDisplay';
import Loading from '@/components/Loading';
import ErrorDuck from '@/components/ErrorDuck';
import Prompt, { ACTION } from '@/components/Prompt';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import { Note, NewNoteElem } from './utilComponents';

import '@/css/NoteBoard.scss';

const defaultState = () => ({
  noteToEdit: null,
  newNoteMode: false,
  defaultNote: null,
  noteToDelete: null,
});

class NoteBoard extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = defaultState();

    this.editNote = ({ originalNote }) => {
      if (originalNote && !this.state.loading) {
        this.setState({ noteToEdit: originalNote });
      }
    };

    this.closeEditNote = () => this.setState(() => ({ noteToEdit: null }));

    this.copyNote = ({ originalNote }) => {
      if (originalNote) {
        this.openNewNoteMode(null, { defaultNote: originalNote });
      }
    };

    this.openNewNoteMode = this.onClickDo((e, payload) => {
      const defaultNote = (payload && payload.defaultNote) || this.props.noteTemplate;
      this.setState({ newNoteMode: true, defaultNote });
    });

    this.closeNewNoteMode = () => this.setState(() => ({ newNoteMode: false, defaultNote: null }));

    this.promptDeleteNote = ({ originalNote }) => {
      if (originalNote) {
        this.setState({ noteToDelete: originalNote });
      }
    };
  }

  renderNotes() {
    const { copyNote, editNote, promptDeleteNote, closeEditNote } = this;
    const { noteToEdit } = this.state;
    const { notesData, whenUpdateNote } = this.props;

    if (notesData) {
      return notesData.map(note => {
        const editMode = !!(noteToEdit && noteToEdit.createTime === note.createTime);
        return (
          <section className="note" key={note.createTime}>
            <Note
              note={note}
              editMode={editMode}
              whenEditNote={editNote}
              whenCancelEditNote={closeEditNote}
              whenSaveNote={whenUpdateNote}
              whenCopyNote={copyNote}
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
    if (noteToEdit) {
      return null;
    }
    return (
      <NewNoteElem
        key="NewNoteElem"
        newNoteMode={newNoteMode}
        defaultNote={defaultNote}
        whenOpenNewNoteMode={this.openNewNoteMode}
        whenCancelNewNote={this.closeNewNoteMode}
        whenSaveNote={this.props.whenSaveNote}
      />
    );
  }

  renderDeleteNotePrompt() {
    if (!this.state.noteToDelete) {
      return null;
    }
    const onClose = ({ action }) => {
      if (action === ACTION.OK) {
        this.fireCallback('whenDeleteNote', this.state.noteToDelete);
      }
      this.setState({ noteToDelete: null });
    };
    return <Prompt msg="Do you really want to delete this note?" onClose={onClose} />;
  }

  render() {
    const { loading, errorMsg } = this.props;

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.noteToEdit) {
      this.closeEditNote();
    }
    if (prevState.newNoteMode || prevState.defaultNote) {
      this.closeNewNoteMode();
    }
  }
}

NoteBoard.propTypes = {
  notesData: PropTypes.array,
  noteTemplate: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  errorMsg: PropTypes.string,
  whenUpdateNote: PropTypes.func.isRequired,
  whenDeleteNote: PropTypes.func.isRequired,
  whenSaveNote: PropTypes.func.isRequired,
};

export default NoteBoard;

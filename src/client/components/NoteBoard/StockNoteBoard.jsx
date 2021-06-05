import React from 'react';
import PropTypes from 'prop-types';

import stockNoteProvider from '@/api/NoteProvider/stockNoteProvider';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

import NoteBoard from './NoteBoard';

/* eslint-disable */
const NOTE_MATE = {
  title: '操作策略',
  fields: [
    [ 'trade', '' ],
    [ 'value', '價值面' ],
    [ 'story', '題材面' ],
    [ 'fundamentals', '基本面' ],
    [ 'technicals', '技術面' ],
    [ 'chips', '籌碼面' ],
  ],
};

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
  error: null,
  loading: false,
});

class StockNoteBoard extends ClickableComponent {
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
          this.setState({ stockNote });
        }
      } catch (error) {
        this.setState({ error });
      }
      this.setState({ loading: false });
    };

    this.whenSaveNote = async ({ newNote }) => {
      if (this.state.loading || !newNote) {
        return;
      }

      this.setState({ error: null, loading: true });
      try {
        if (this.state.stockNote) {
          await stockNoteProvider.addNote(this.state.stockId, newNote);
        } else {
          await stockNoteProvider.create({ stockId: this.state.stockId, note: newNote });
        }
        this.loadStockNote(this.state.stockId, true);
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    this.whenUpdateNote = async ({ newNote, originalNote }) => {
      if (!newNote || !originalNote.createTime) {
        return;
      }

      this.setState({ error: null, loading: true });
      try {
        newNote.createTime = originalNote.createTime;
        await stockNoteProvider.updateNote(this.state.stockId, newNote);
        this.loadStockNote(this.state.stockId, true);
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    this.whenDeleteNote = async noteToDelete => {
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

  render() {
    const { stockNote, loading, error } = this.state;

    const errorMsg = error ? error.toString() : '';

    return (
      <NoteBoard
        loading={loading}
        errorMsg={errorMsg}
        noteMate={NOTE_MATE}
        notesData={stockNote && stockNote.notes}
        noteTemplate={getNoteTemplate()}
        whenSaveNote={this.whenSaveNote}
        whenUpdateNote={this.whenUpdateNote}
        whenDeleteNote={this.whenDeleteNote}
      />
    );
  }

  componentDidMount() {
    this.loadStockNote(this.props.stockId);
  }

  componentDidUpdate() {
    this.loadStockNote(this.props.stockId);
  }
}

StockNoteBoard.propTypes = {
  stockId: PropTypes.string.isRequired,
};

export default StockNoteBoard;

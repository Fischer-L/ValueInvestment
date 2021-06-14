import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import storyNoteProvider from '@/api/NoteProvider/storyNoteProvider';
import bookmarkProvider, { BOOKMARK_TYPE } from '@/api/bookmarkProvider';
import Prompt, { ACTION } from '@/components/Prompt';
import BookmarkBoard, { BookmarkItem } from '@/components/BookmarkBoard/BookmarkBoard';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';

class BookmarkBoardStory extends ClickableComponent {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      storyToDelete: null,
    };

    this.whenBookmark = async title => {
      title = title.trim();
      const id = await storyNoteProvider.create({ noteMeta: { title } });
      bookmarkProvider.put(BOOKMARK_TYPE.STORIES, id, { id, title }).then(() => this.populateStories());
    };

    this.whenQuery = () => {};
    // ({ id }) => {
    //   console.log('TODO whenQuery');
    // };

    this.whenRemove = ({ id }) => {
      const storyToDelete = this.state.stories.find(data => data.id === id);
      if (storyToDelete) {
        this.setState({ storyToDelete });
      }
    };

    this.clearStory = id => {
      bookmarkProvider.remove(BOOKMARK_TYPE.STORIES, id).then(() => {
        storyNoteProvider.clear(id);
        this.populateStories();
      });
    };

    this.populateStories = () => {
      bookmarkProvider.toArray(BOOKMARK_TYPE.STORIES).then(stories => this.setState({ stories }));
    };

    this.populateStories();
  }

  renderDeletePrompt() {
    if (!this.state.storyToDelete) {
      return null;
    }
    const whenClose = ({ action }) => {
      if (action === ACTION.OK) {
        this.clearStory(this.state.storyToDelete.id);
      }
      this.setState({ storyToDelete: null });
    };
    return <Prompt msg="The bookmark and all notes of this story will be deleted together. Are you sure?" whenClose={whenClose} />;
  }

  renderStoryItems() {
    return this.state.stories.map(({ id, title }) => <BookmarkItem key={id} id={id} title={title} whenQuery={this.whenQuery} whenRemove={this.whenRemove} />);
  }

  render() {
    const { show, whenCloseBookmark } = this.props;
    const bookmarkBoardProps = { show, whenCloseBookmark, whenBookmark: this.whenBookmark };
    return (
      <BookmarkBoard {...bookmarkBoardProps}>
        <List className="bookmark-list" size="large">{ this.renderStoryItems() }</List>;
        { this.renderDeletePrompt() }
      </BookmarkBoard>
    );
  }
}
BookmarkBoardStory.propTypes = {
  show: PropTypes.bool,
  whenCloseBookmark: PropTypes.func,
};

export default BookmarkBoardStory;

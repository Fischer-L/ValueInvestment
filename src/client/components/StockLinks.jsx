import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

import openLink from '@/utils/openLink';
import ClickableComponent from '@/components/subcomponents/ClickableComponent';
import '@/css/StockLinks.scss';

class StockLinks extends ClickableComponent {
  constructor(props) {
    super(props);
    this.openLinks = this.onClickDo(() => openLink(...this.props.links.map(link => link.url)));
  }

  render() {
    const { links } = this.props;
    const classes = [ 'stockLinks', this.props.className || '' ];
    return (
      <List className={classes.join(' ')} bulleted horizontal size="large">
        { links.map(({ url, title }) => <List.Item as="a" target="_blank" rel="noopener noreferrer" href={url} key={url}>{title}</List.Item>) }
        <Button className="stockLinks-openBtn" icon="globe" circular onClick={this.openLinks} onTouchEnd={this.openLinks} />
      </List>
    );
  }
}

StockLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  className: PropTypes.string,
};

export default StockLinks;

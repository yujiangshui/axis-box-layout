'use strict';

import React, {Component} from 'react';

class Box extends Component {
  static displayName = 'Box';

  static propTypes = {
    xPos: React.PropTypes.oneOf(['start', 'center', 'end']),
    yPos: React.PropTypes.oneOf(['start', 'center', 'end']),
    yStretch: React.PropTypes.bool,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    element: React.PropTypes.string,
  };

  static defaultProps = {
    xPos: 'start',
    yPos: 'start',
    yStretch: false,
    style: {},
    className: '',
    element: 'div'
  };

  render() {
    const {
      xPos,
      yPos,
      yStretch,
      style: propsStyle,
      className,
      element,
      ...others
    } = this.props;

    let styles = {};
    if (xPos === 'start') {
    }
    if (xPos === 'center') {
      styles.marginLeft = 'auto';
      styles.marginRight = 'auto';
    }
    if (xPos === 'end') {
      styles.marginLeft = 'auto';
    }
    if (yPos === 'start') {
    }
    if (yPos === 'center') {
      styles.marginTop = 'auto';
      styles.marginBottom = 'auto';
    }
    if (yPos === 'end') {
      styles.marginTop = 'auto';
    }
    if (yStretch) {
      styles.alignSelf = 'stretch';
    }

    return React.createElement(
      element,
      {
        className: `axis-box ${className}`,
        style: {...boxDefaultStyles,...styles, ...propsStyle},
        ...others
      },
      this.props.children
    );
  }
}

const boxDefaultStyles = {
  display: 'block',
};

export default Box;
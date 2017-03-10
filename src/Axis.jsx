'use strict';

import React, {Component} from 'react';

class Axis extends Component {
  static displayName = 'Axis';

  static propTypes = {
    alignAxis: React.PropTypes.string,
    justify: React.PropTypes.bool,
    wrap: React.PropTypes.bool,
    xPos: React.PropTypes.oneOf(['start', 'center', 'end']),
    yPos: React.PropTypes.oneOf(['start', 'center', 'end']),
    yStretch: React.PropTypes.bool,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    // todo
    boxMarginOffset: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    element: React.PropTypes.string,
  };

  static defaultProps = {
    alignAxis: 'x',
    justify: false,
    wrap: false,
    yStretch: false,
    className: '',
    style: {},
    boxMarginOffset: 0,
    element: 'div'
  };

  render() {

    const {
      alignAxis,
      justify,
      yStretch,
      xPos,
      yPos,
      wrap,
      style: propsStyle,
      className,
      boxMarginOffset,
      children,
      element,
      ...others
    } = this.props;

    let newChildren = children;

    let styles = {};
    if (alignAxis === 'y') {
      newChildren = React.Children.map(children, (child) => {
        if (child.type && child.type.name === 'Box') {
          const childStyle = child.props.style || {};
          return React.cloneElement(child, {
            style: {
              ...childStyle,
              width: '100%',
            }
          });
        }
        return child;
      });
    }

    if (xPos === 'start') {
      styles.justifyContent = 'flex-start';
    }
    if (xPos === 'center') {
      styles.justifyContent = 'center';
    }
    if (xPos === 'end') {
      styles.justifyContent = 'flex-end';
    }
    if (yPos === 'start') {
      styles.alignItems = 'flex-start';
    }
    if (yPos === 'center') {
      styles.alignItems = 'center';
    }
    if (yPos === 'end') {
      styles.alignItems = 'flex-end';
    }

    // 两端对齐
    if (justify) {
      styles.justifyContent = 'space-between';
    }
    // 高度拉伸全高度
    if (yStretch) {
      styles.alignItems = 'stretch';
    }

    if (wrap) {
      styles.flexWrap = 'nowrap';
    }

    if (boxMarginOffset) {
      let unit = getCSSUnit(boxMarginOffset);
      let value = getCSSValue(boxMarginOffset);
      styles.width = `calc(100% + ${value * 2}${unit})`;
      styles.marginLeft = `-${value}${unit}`;
    }


    return React.createElement(
      element,
      {
        className: `axis-wrap ${className}`,
        style: {...axisDefaultStyles, ...styles, ...propsStyle},
        ...others
      },
      newChildren
    );
  }
}


const axisDefaultStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignContent: 'flex-start',
  flexDirection: 'row',
  flexWrap: 'wrap',
};

let isNumber = (val) => {
  return parseFloat(val) === val;
};
let getCSSValue = (val) => {
  return parseFloat(val);
};
let getCSSUnit = (val) => {
  if (isNumber(val)) {
    return 'px';
  } else {
    return val.split('').reduce((finalUnit = '', currentStr) => {
      if (!/[\d\.]/.test(currentStr)) {
        return finalUnit + currentStr;
      }
    }, '');
  }
};

export default Axis;
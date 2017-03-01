import React, { PureComponent } from 'react';

import fabric from '../services/fabric';

import * as propShapes from '../prop-shapes';

import styles from './Canvas.styl';


class Canvas extends PureComponent {
  componentDidMount() {
    // Promote DOM node reference to a fabric instance
    this.canvas = new fabric.Canvas(this.canvasNode);
    this.renderAll = this.canvas.renderAll.bind(this.canvas);
    window.c = this.canvas;
    this.updateBackground();
  }

  componentDidUpdate() {
    this.updateBackground();
  }

  updateBackground () {
    if( this.props.face ) {
      this.canvas.setBackgroundImage(
        this.props.face.image,
        this.canvas.renderAll.bind(this.canvas),
        {
          // Needed to position background image at 0/0
          originX: 'left',
          originY: 'top',
        }
      );
    }
  }

  render() {
    return (
      <canvas
        className={styles.canvas}
        ref={node => (this.canvasNode = node)}
        width="250"
        height="250"
      />
    );
  }
}

Canvas.propTypes = {
  face: propShapes.face,
};

Canvas.defaultProps = {
  face: null,
};

export default Canvas;

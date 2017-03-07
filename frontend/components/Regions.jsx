/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import fabric from '../services/fabric';
import * as propShapes from '../prop-shapes';
import styles from './Canvas.styl';

function createCanvas(canvasNode) {
  const canvas = new fabric.Canvas(canvasNode);

  function capturePoints(landmark) {
    console.log(landmark.target.uniqId, landmark.target.left, landmark.target.top);
  }

  canvas.on({
    'object:modified': capturePoints,
    // 'object:moving': capturePoints,
    // 'object:scaling': capturePoints,
    // 'object:resizing': capturePoints,
    // 'object:rotating': capturePoints
  });

  return canvas;
}

class Canvas extends PureComponent {
  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.canvasNode);
    // Promote DOM node reference to a fabric instance
    this.canvas = createCanvas(this.canvasNode);

    console.log(this.props.face);

    // Update the background if a face is already available
    this.updateBackground(this.props.face);

    window.c = this;
  }

  shouldComponentUpdate(nextProps) {
    console.log('shouldComponentUpdate');
    console.log(nextProps.face);

    // If the face has changed, update the background image & reset the rect
    if (this.props.face !== nextProps.face) {
      console.log('notEqual');
      this.updateBackground(nextProps.face);
      // this.resetRect();
      // this.canvas.renderAll();
    }

    // Prevent all DOM updates: re-rendering the underlying canvas node would
    // disconnect our Fabric.js canvas
    return false;
  }

  componentWillUnmount() {
    // The fabric canvas lives outside of React, so we have to manually remove
    // it when the React component is unmounted
    this.canvas.wrapperEl.remove();
  }

  updateBackground(face) {
    console.log('updateBackground');

    if (face) {
      console.log('have face, will travel');
      this.canvas.setBackgroundImage(
        face.image,
        this.canvas.renderAll.bind(this.canvas),
        {
          // Needed to position background image at 0/0
          originX: 'left',
          originY: 'top',
          width: 500,
          height: 500,
        }
      );

      console.log(styles);

      // Initialize the region-selection rectangle
      this.resetRect();

    }
  }

  resetRect() {
    // If a previous rectangle exists, remove it from the canvas
    if (this.rect) {
      console.log('removing rect');
      this.canvas.remove(this.rect);
    }

    // Create a new rectangle & store it on our component instance so that we
    // can remove it by reference next time this method is called
    this.rect = new fabric.Rect({
      left: 290,
      top: 210,
      width: 80,
      height: 60,
      fill: 0,
      stroke: '#333',
      hasRotatingPoint: 0,
    });

    console.log('adding rect');
    this.canvas.add(this.rect);
  }

  render() {
    console.log('render');
    return (
      <canvas
        className={styles.canvas}
        ref={node => (this.canvasNode = node)}
        width="500"
        height="500"
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

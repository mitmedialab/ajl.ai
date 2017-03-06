import React, { PureComponent } from 'react';
import fabric from '../services/fabric';
import * as propShapes from '../prop-shapes';
import styles from './Canvas.styl';

class Canvas extends PureComponent {
  componentDidMount() {
    // Promote DOM node reference to a fabric instance
    this.canvas = new fabric.Canvas(this.canvasNode);
    this.renderAll = this.canvas.renderAll.bind(this.canvas);
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
          top: -650,
          left: -650,
          width: 2000,
          height: 2000
        }
      );

      this.canvas.add(
        makeCircle(70, 200, 1),
        makeCircle(150, 180, 2),
        makeCircle(215, 185, 3),
        makeCircle(220, 280, 4),
        makeCircle(160, 280, 5),
        makeCircle(310, 275, 6)
      );

      function capturePoints(landmark){
        console.log(landmark.target.uniqId, landmark.target.left, landmark.target.top);
      }

      this.canvas.on({
        'object:modified': capturePoints,
        // 'object:moving': capturePoints,
        // 'object:scaling': capturePoints,
        // 'object:resizing': capturePoints,
        // 'object:rotating': capturePoints
      });

    }
  }

  render() {
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

function makeCircle(left, top, uniqId, color) {
  var c = new fabric.Circle({
    left: left,
    top: top,
    strokeWidth: 1,
    radius: 8,
    fill: color || '#33a',
    uniqId: uniqId
  });
  c.hasControls = c.hasBorders = false;
  return c;
}

Canvas.propTypes = {
  face: propShapes.face,
};

Canvas.defaultProps = {
  face: null,
};

export default Canvas;

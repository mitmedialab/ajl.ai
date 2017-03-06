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
          width: 500,
          height: 500
        }
      );

      var rect = new fabric.Rect({
        left: 290,
        top: 210,
        width: 80,
        height: 60,
        fill: 0,
        stroke: '#333',
        hasRotatingPoint: 0
      });
      this.canvas.add(rect);

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

      console.log(styles)

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

Canvas.propTypes = {
  face: propShapes.face,
};

Canvas.defaultProps = {
  face: null,
};

export default Canvas;

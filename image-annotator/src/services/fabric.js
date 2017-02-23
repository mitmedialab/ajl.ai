// Wrapper for fabric to predictably set some app-wide defaults

// Seems to be the only way to get fabric to load via import
import { fabric } from 'fabric';

// Center the fabric coordinate plane
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.originX = 'center';
fabric.Object.prototype.originY = 'center';

export default fabric;

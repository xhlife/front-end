import Vector from './Vector';

class ShapeJudge {
  /**
   * 判断点是否在圆内及圆上
   * @param {*} point
   * @param {*} circle
   */
  static isPointInCircle(point, circle) {
    const { center, distance } = circle;
    let vec = new Vector(point, center);
    let lengthSq = (vec.x * vec.x) + (vec.y * vec.y);
    let length = Math.sqrt(lengthSq);
    if (length <= distance) {
      return true;
    }
    return false;
  }
}

export default ShapeJudge;

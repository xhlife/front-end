import Victor from 'victor';

class Vector extends Victor {
  constructor(startPoint, endPoint) {
    super(endPoint.x - startPoint.x, endPoint.y - startPoint.y);

    this.start = startPoint;
    this.end = endPoint;
  }

  static createByXY(x, y) {
    return new Vector({ x: 0, y: 0 }, { x, y });
  }

  /**
   * 通过角度（弧度制）和长度创建向量
   * @param {*} angle
   * @param {*} length
   */
  static createByAngle(angle, length) {
    const vec = this.createByXY(1, 0);

    return vec.rotate(angle).multiplyScalar(length);
  }
}

export default Vector;

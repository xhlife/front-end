import Victor from 'victor';
import PointAction from './PointAction';
import Vector from './Vector';
import Factory from './Factory';

class PointFetch {
  /**
   * 从点数组内获取最外侧的两个点
   * @param {*} points
   */
  static getMinMaxPoint(points) {
    const sorted = [...points].sort((a, b) => {
      if (a.x !== b.x) return a.x - b.x;
      return a.y - b.y;
    });
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  }

  /**
   * 获取两个点之间的距离
   * @param {*} pointA
   * @param {*} pointB
   */
  static getDistanceBetween(pointA, pointB) {
    // return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2);
    return new Vector(pointA, pointB).length();
  }

  /**
   * 获取3个点形成的两个向量的夹角(角度值)[0, 360)
   * @param {*} origin
   * @param {*} arrow1
   * @param {*} arrow2
   */
  static getAngleDegFromPoints(origin, arrow1, arrow2) {
    let x1 = arrow1.x - origin.x;
    let y1 = arrow1.y - origin.y;
    let x2 = arrow2.x - origin.x;
    let y2 = arrow2.y - origin.y;
    const dot = (x1 * x2) + (y1 * y2);
    const det = (x1 * y2) - (y1 * x2);
    let angle = (180 * Math.atan2(det, dot)) / Math.PI;
    return (angle + 360) % 360;
  }


  static getRectWithPointAndLW(point, side1, side2 = side1) {
    let halfLen = side1 / 2;
    let halfWidth = side2 / 2;
    let vic1 = new Victor(-halfLen, halfWidth);
    let vic2 = new Victor(halfLen, halfWidth);
    let vic3 = new Victor(halfLen, -halfWidth);
    let vic4 = new Victor(-halfLen, -halfWidth);
    let p1 = PointAction.addVector(point, vic1);
    let p2 = PointAction.addVector(point, vic2);
    let p3 = PointAction.addVector(point, vic3);
    let p4 = PointAction.addVector(point, vic4);
    return [p1, p2, p3, p4];
  }

  static getDistanceAndAngleWithTwoPoints(sp, ep) {
    let distance = this.getDistanceBetween(sp, ep);
    let p = PointAction.addVector(sp, { x: 1000, y: 0 });
    let angle = this.getAngleDegFromPoints(sp, p, ep);
    return { distance, angle };
  }

  // 获得一个点(point)绕一中心点(centerPoint)旋转angle度后的坐标
  static getRotatePoint(point, angle, centerPoint) {
    // eslint-disable-next-line no-mixed-operators
    let radian = angle / 180 * Math.PI;
    let originPoint = PointAction.clonePoint(point);
    originPoint.x = (((point.x - centerPoint.x) * Math.cos(radian)) - ((point.y - centerPoint.y) * Math.sin(radian))) + centerPoint.x;
    originPoint.y = ((point.x - centerPoint.x) * Math.sin(radian)) + ((point.y - centerPoint.y) * Math.cos(radian)) + centerPoint.y;
    return originPoint;
  }

  /**
   * 获取线段开始端点某个距离上的点
   * @param {*} line 
   * @param {*} length 
   */
   static getPointOfDistanceOnLine(line, length) {
    const angle = new Vector(line.startPoint, line.endPoint).angle();
    const vec = Vector.createByAngle(angle, length);
    return Factory.createPoint(line.startPoint.x + vec.x, line.startPoint.y + vec.y);
  }
}

export default PointFetch;

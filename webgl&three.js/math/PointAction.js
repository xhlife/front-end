import { accurate } from '../utils/common.utils';
import Factory from './Factory';

class PointAction {
  static clonePoint(point) {
    return Factory.createPoint(point.x, point.y);
  }

  static updatePoint(point, { x, y }) {
    if (x !== undefined) point.x = accurate(x, 2);
    if (y !== undefined) point.y = accurate(y, 2);
  }

  static addVector(point, vector) {
    return {
      // ...point,
      x: point.x + vector.x,
      y: point.y + vector.y,
    };
  }

  static subVector(point, vector) {
    return {
      // ...point,
      x: point.x - vector.x,
      y: point.y - vector.y,
    };
  }

  /**
   * 从点数组中获取距离最远的两个点
   * @param {*} points
   * @returns
   */
  static getFarthestTwoPointsFrom(points) {
    if (!Array.isArray(points) || points.length < 2) return undefined;

    let point1 = points.pop();
    let point2 = points.pop();

    let maxDis = this.getDistanceBetween(point1, point2);

    while (points.length) {
      let pointTemp = points.pop();
      let dis1 = this.getDistanceBetween(pointTemp, point1);
      let dis2 = this.getDistanceBetween(pointTemp, point2);
      if (dis1 > dis2) {
        if (dis1 > maxDis) {
          point2 = pointTemp;
          maxDis = dis1;
        }
      } else if (dis2 > maxDis) {
        point1 = pointTemp;
        maxDis = dis2;
      }
    }

    return [point1, point2];
  }

  // * 主要用于在识别dxf中,block中的坐标与全局坐标之间的转换

  // 全局转为局部坐标
  static convertToLocalCoordinate(point, radian, offset = { x: 0, y: 0 }) {
    let currentPoint = { x: 0, y: 0 };
    currentPoint.x = offset.x + ((point.x * Math.cos(radian)) + (point.y * Math.sin(radian)));
    currentPoint.y = offset.y + ((point.y * Math.cos(radian)) - (point.x * Math.sin(radian)));
    return currentPoint;
  }

  // 局部转为全局坐标
  static convertToGlobalCoordinate(point, radian, offset = { x: 0, y: 0 }) {
    let basePoint = { x: 0, y: 0 };
    basePoint.x = offset.x + ((point.x * Math.cos((-1) * radian)) + (point.y * Math.sin((-1) * radian)));
    basePoint.y = offset.y + ((point.y * Math.cos((-1) * radian)) - (point.x * Math.sin((-1) * radian)));
    return basePoint;
  }

  static getMiddlePoint(pointA, pointB) {
    return {
      x: (pointA.x + pointB.x) / 2,
      y: (pointA.y + pointB.y) / 2,
    };
  }
}

export default PointAction;

// 对线进行操作
// 一部分直接影响target本身，另一部分不会

import { isEqualForFloat } from '../src/utils/common.utils';
import Factory from './Factory';
import LineFetch from './LineFetch';
import PointAction from './PointAction';
import PointJudge from './PointJudge';
import Vector from './Vector';


// 基础函数，不会对数据作过多的验证
// 不会对Line，Point这些基础数据参数验证
// 只判断是否存在
// 异常时，返回undefined

class LineAction {
  static cloneLine(line) {
    return Factory.createLine(PointAction.clonePoint(line.startPoint), PointAction.clonePoint(line.endPoint));
  }

  /**
   * 通过线更新线
   * @param {*} target
   * @param {*} source
   */
  static updateByLine(target, source) {
    PointAction.updatePoint(target.startPoint, source.startPoint);
    PointAction.updatePoint(target.endPoint, source.endPoint);
  }

  /**
   * 更新线的一个端点
   * @param {*} line
   * @param {*} point
   * @param {*} index
   */
  static updateEndPoint(line, point, index) {
    if (index === 0) {
      line.startPoint = point;
    } else {
      line.endPoint = point;
    }
  }

  /**
   * 截取线，从中间点到终点作截取
   * 前提：点point在线段line上
   * @param {*} line
   * @param {*} point
   * @returns Line
   */
  static splitLine(line, point) {
    return {
      startPoint: point,
      endPoint: { ...line.endPoint },
    };
  }

  /**
   * 线沿着向量平移
   */
  static translateByVec(line, vector) {
    PointAction.addVector(line.startPoint, vector);
    PointAction.addVector(line.endPoint, vector);
  }

  /**
   * 从一端点延长线
   * @param {*} line
   * @param {*} point
   * @param {*} distance
   */
  static extendLineByOneEnd(line, point, distance) {
    let newX;
    let newY;
    let slope;

    let xSign;
    let ySign;

    if (PointJudge.isEqualBetween(point, line.startPoint)) {
      ySign = (point.y - line.endPoint.y) > 0 ? 1 : -1;
      xSign = (point.x - line.endPoint.x) > 0 ? 1 : -1;
      slope = LineFetch.getSlopeOf(line, true);
    } else {
      ySign = (point.y - line.startPoint.y) > 0 ? 1 : -1;
      xSign = (point.x - line.startPoint.x) > 0 ? 1 : -1;
      slope = LineFetch.getSlopeOf(line, false);
    }

    // }
    if (isEqualForFloat(slope, Number.MAX_VALUE)) { // 垂直x轴
      newX = point.x;
      newY = point.y + (ySign * distance);
    // if (ThreeUtils.isBetweenTwoValue(newY, this.startPoint.y, this.endPoint.y)) {
    //   newY = point.y - distance;
    // }
    } else if (isEqualForFloat(slope, 0)) { // 垂直y轴
      newX = point.x + (xSign * distance);
      newY = point.y;
    // if (ThreeUtils.isBetweenTwoValue(newX, this.startPoint.x, this.endPoint.x)) {
    //   newX = point.x - distance;
    // }
    } else {
      let powSlop = slope ** 2;
      let sqrSlope = Math.sqrt((powSlop) + 1);
      newX = point.x + (xSign * (distance / sqrSlope));
      newY = point.y + ((slope * (newX - point.x)));
    }

    const newPoint = Factory.createPoint(newX, newY);

    if (PointJudge.isEqualBetween(point, line.startPoint)) {
      PointAction.updatePoint(line.startPoint, newPoint);
    } else {
      PointAction.updatePoint(line.endPoint, newPoint);
    }
  }

  /**
   * 线中心旋转angle（弧度制）
   * @param {*} line
   * @param {*} angle
   * @returns
   */
  static rotateLine(line, angle) {
    let center = LineFetch.getMiddlePointOf(line);

    let startVec = new Vector(center, line.startPoint);
    let endVec = new Vector(center, line.endPoint);
    startVec.rotate(angle);
    endVec.rotate(angle);

    const sp = PointAction.addVector(PointAction.clonePoint(center), startVec);
    const ep = PointAction.addVector(PointAction.clonePoint(center), endVec);

    return Factory.createLine(sp, ep);
  }
}

export default LineAction;

// 判断和线相关一些,返回值都是Bool值

import Victor from 'victor';
import { isEqualForFloat, cross, accurate } from '../utils/common.utils';
// import ThreeUtils from '../../common/utils/three.utils';
import LineFetch from './LineFetch';
import PointFetch from './PointFetch';
import PointJudge from './PointJudge';

// 忽略语法,统一使用is, has来判断
// ! 所有函数中的阈值最好统一
class LineJudge {
  /**
   * 判断两个线是否垂直
   * @param {*} lineA
   * @param {*} lineB
   */
  static isVerticalBetween(lineA, lineB, Threshold) {
    let one = new Victor(lineA.endPoint.x - lineA.startPoint.x, lineA.endPoint.y - lineA.startPoint.y);
    let two = new Victor(lineB.endPoint.x - lineB.startPoint.x, lineB.endPoint.y - lineB.startPoint.y);
    // 点乘
    // a·b>0    方向基本相同，夹角在0°到90°之间
    // a·b=0    正交，相互垂直
    // a·b<0    方向基本相反，夹角在90°到180°之间
    let result = one.dot(two);
    return isEqualForFloat(result, 0, Threshold);
  }

  /**
   * 判断两个线是否平行
   * ! 垂直和平行的方法最好都统一采用向量Vector来作处理
   * @param {*} lineA
   * @param {*} lineB
   */
  static isParallelBetween(lineA, lineB, delta = 0.001) {
    let one = new Victor(lineA.endPoint.x - lineA.startPoint.x, lineA.endPoint.y - lineA.startPoint.y);
    let two = new Victor(lineB.endPoint.x - lineB.startPoint.x, lineB.endPoint.y - lineB.startPoint.y);

    const slope1 = one.angle() % (Math.PI);
    const slope2 = two.angle() % (Math.PI);


    // 测试
    // if (Math.abs(slope1) > 50 && Math.abs(slope2) > 50) {
    //   return true;
    // }
    // if (Math.abs(slope1) > 10 && Math.abs(slope2) > 10) {
    //   // eslint-disable-next-line no-param-reassign
    //   delta *= 10;
    // }
    return isEqualForFloat(slope1, slope2, delta);
  }

  /**
   * 点是否和线的端点是否相等
   * @param {*} point
   * @param {*} line
   */
  static isPointEqualLineEndPoint(point, line) {
    return PointJudge.isApproximateEqual(point, line.startPoint) || PointJudge.isApproximateEqual(point, line.endPoint);
  }

  /**
   * 判断是否平行于X
   * @param {*} line
   * @param {*} delta
   */
  static isParallelX(line, delta = 1) {
    const start = line.startPoint;
    const end = line.endPoint;
    return isEqualForFloat(start.y, end.y, delta);
  }

  /**
   * 判断是否平行于Y
   * @param {*} line
   * @param {*} delta
   */
  static isParallelY(line, delta = 1) {
    const start = line.startPoint;
    const end = line.endPoint;
    return isEqualForFloat(start.x, end.x, delta);
  }

  /**
   * 判断两个线是否相等
   * @param {*} lineA
   * @param {*} lineB
   * @param {*} Threshold
   */
  static isEqualBetween(lineA, lineB, Threshold) {
    if (
      PointJudge.isEqualBetween(lineA.startPoint, lineB.startPoint, Threshold)
      &&
      PointJudge.isEqualBetween(lineA.endPoint, lineB.endPoint, Threshold)
    ) return true;

    if (
      PointJudge.isEqualBetween(lineA.startPoint, lineB.endPoint, Threshold)
      &&
      PointJudge.isEqualBetween(lineA.endPoint, lineB.startPoint, Threshold)
    ) return true;

    return false;
  }

  /**
   * 判断两个线两条线是否是链接起来的，即是否有共点
   * @param {*} lineA
   * @param {*} lineB
   */
  static isConnectedBetween(lineA, lineB) {
    return this.isPointEqualLineEndPoint(lineA.startPoint, lineB)
      || this.isPointEqualLineEndPoint(lineA.endPoint, lineB);
  }

  /**
   * 判断两条线是否共线
   * @param {*} lineA
   * @param {*} lineB
   */
  static isCommonLine(lineA, lineB) {
    if (this.isPointInLine(lineB.startPoint, lineA) && this.isPointInLine(lineB.endPoint, lineA)) {
      return true;
    }
    return false;
  }

  /**
   * 判断平行线是否共线，共线函数特殊情况的简化方法
   *
   * 前提：两条线平行
   * @param {*} lineA
   * @param {*} lineB
   */
  static isParallelLineCommonLine(lineA, lineB) {
    return this.isPointInLine(lineB.startPoint, lineA);
  }

  /**
   * 判断是否共线且相连
   * @param {*} lineA
   * @param {*} lineB
   */
  static isCommonLineAndConnectedBetween(lineA, lineB) {
    let point = null;

    if (this.isPointEqualLineEndPoint(lineB.startPoint, lineA)) {
      point = lineB.startPoint;
    }

    if (this.isPointEqualLineEndPoint(lineB.endPoint, lineA)) {
      point = lineB.endPoint;
    }

    if (point === null) {
      return false;
    }

    return this.isPointInLine(point, lineA);
  }
  /**
   * 判断点是否在直线line上
   * @param {*} point
   * @param {*} line
   */
  static isPointInLine(point, line, threshold = 2) {
    // 不准确
    // let voc = cross(point, line.startPoint, line.endPoint);
    // return isEqualForFloat(voc, 0, 0.002);
    let x1 = line.startPoint.x;
    let y1 = line.startPoint.y;
    let x2 = line.endPoint.x;
    let y2 = line.endPoint.y;
    let x0 = point.x;
    let y0 = point.y;

    if (x1 === x2) {
      let dis = Math.abs(x0 - x1);
      return dis < threshold;
    } else if (y1 === y2) {
      let dis = Math.abs(y0 - y1);
      return dis < threshold;
    }

    let k = ((x1 === x2) ? 10000 : ((y2 - y1) / (x2 - x1)));// 当x1=x2时，给斜率设一个较大值10000
    let a = k;
    let b = -1;
    let c = y1 - (k * x1);

    let d = Math.abs((a * x0) + (b * y0) + c) / Math.sqrt((a * a) + (b * b));

    return d < threshold;
  }

  /**
   * 判断线段所在直线上的一点，是否在该线段上
   * 前提：点在线段所在的直线上
   * @param {*} point
   * @param {*} line
   * @param {*} threshold
   */
  static isLinePointInSegment(line, point, threshold = 10) {
    let min = line.startPoint.x;
    let max = line.endPoint.x;
    let miny = line.startPoint.y;
    let maxy = line.endPoint.y;
    if (line.startPoint.x > line.endPoint.x) {
      min = line.endPoint.x;
      max = line.startPoint.x;
    }
    if (line.startPoint.y > line.endPoint.y) {
      miny = line.endPoint.y;
      maxy = line.startPoint.y;
    }

    if ((isEqualForFloat(min, point.x, threshold) || isEqualForFloat(max, point.x, threshold) || (min < point.x && point.x < max))
      && (isEqualForFloat(miny, point.y, threshold) || isEqualForFloat(maxy, point.y, threshold) || (miny < point.y && point.y < maxy))) {
      return true;
    }
    return false;
  }

  /**
   * 判断一个点是否在线段上，且更靠近指定端点上
   * @param {*} point
   * @param {*} line
   * @param {*} nearPoint
   */
  static isLinePointInSegmentAndNearEndPoint(point, line, nearPoint) {
    if (!this.isLinePointInSegment(line, point)) return false;

    let dis1 = PointFetch.getDistanceBetween(point, nearPoint);
    let dis2;
    if (PointJudge.isApproximateEqual(nearPoint, line.startPoint)) {
      dis2 = PointFetch.getDistanceBetween(point, line.startPoint);
    } else {
      dis2 = PointFetch.getDistanceBetween(point, line.endPoint);
    }

    return dis1 < dis2;
  }

  /**
   * 判断直线上的点是否在射线上
   * @param {*} arrowPoint
   * @param {*} basePoint
   * @param {*} point
   */
  static isLinePointInHalfLine(arrowPoint, basePoint, point) {
    // 判断 向量bp->p 与 bp->ap 的单位向量是否相同（同向）
    // 相同则在射线上，反之则不在
    let bpP = ThreeUtils.getVicByPoint(basePoint, point);
    let bpAp = ThreeUtils.getVicByPoint(basePoint, arrowPoint);

    // TODO: accurate去掉
    return (accurate(bpP.x, 2) === accurate(bpAp.x, 2)) && (accurate(bpP.y, 2) === accurate(bpAp.y, 2));
  }

  /**
   * 判断任意一点是否在线段上
   * @param {*} point
   * @param {*} segment
   */
  static isPointInSegment(point, segment, threshold = 10) {
    if (!this.isPointInLine(point, segment, threshold)) return false;

    let min = segment.startPoint.x;
    let max = segment.endPoint.x;
    let miny = segment.startPoint.y;
    let maxy = segment.endPoint.y;

    if (segment.startPoint.x > segment.endPoint.x) {
      min = segment.endPoint.x;
      max = segment.startPoint.x;
    }
    if (segment.startPoint.y > segment.endPoint.y) {
      miny = segment.endPoint.y;
      maxy = segment.startPoint.y;
    }

    if ((isEqualForFloat(min, point.x, threshold) || isEqualForFloat(max, point.x, threshold) || (min < point.x && point.x < max))
      && (isEqualForFloat(miny, point.y, threshold) || isEqualForFloat(maxy, point.y, threshold) || (miny < point.y && point.y < maxy))) {
      return true;
    }
    return false;
  }

  /**
   * !! 应该改成纯向量形式，避免LineJudge和LineFetch的相互引用
   */
  // static isTwoPointInLineSameSide(point1, point2, line) {
  //   if (PointJudge.isEqualBetween(point1, point2)) return true;

  //   if (this.isPointInLine(point1, line) || this.isPointInLine(point2, line)) {
  //     return false;
  //   }

  //   let footPoint1 = LineFetch.getVerticalFoot(line, point1);
  //   let footPoint2 = LineFetch.getVerticalFoot(line, point2);

  //   if ((point1.x - footPoint1.x) * (point2.x - footPoint2.x) > 0) {
  //     return true;
  //   } else if ((point1.x - footPoint1.x) * (point2.x - footPoint2.x) === 0) {
  //     if ((point1.y - footPoint1.y) * (point2.y - footPoint2.y) > 0) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  /**
   * 判断共线的lineA是否包含lineB
   *
   * 前提：lineA,lineB共线
   * @param {*} lineA
   * @param {*} lineB
   */
  static isSegmentInSegment(lineA, lineB) {
    return (
      this.isLinePointInSegment(lineA, lineB.startPoint)
      &&
      this.isLinePointInSegment(lineA, lineB.endPoint)
    );
  }

  /**
   * 判断两条线在X轴或Y轴上是否重叠
   */
  static isOverlappingBetween(lineA, lineB, threshold = 0) {
    let distance = ThreeUtils.getOverLayDistance(lineA.startPoint.y, lineA.endPoint.y, lineB.startPoint.y, lineB.endPoint.y);
    // 平行x轴
    if (distance < threshold) {
      distance = ThreeUtils.getOverLayDistance(lineA.startPoint.x, lineA.endPoint.x, lineB.startPoint.x, lineB.endPoint.x);
    }
    return distance >= threshold;
  }

  /**
   * 判断是否存在一条线段的起终点在另一条线段上
   */
  static isExistPointInSegment(lineA, lineB) {
    if (this.isPointInSegment(lineA.startPoint, lineB) || this.isPointInSegment(lineA.endPoint, lineB) || this.isPointInSegment(lineB.startPoint, lineA) || this.isPointInSegment(lineB.endPoint, lineA)) {
      return true;
    }
    return false;
  }
}

export default LineJudge;

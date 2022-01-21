// import { LinePointDefine } from '../../../common/constant/const';
// import ThreeUtils from '../../common/utils/three.utils';
import Factory from './Factory';
import LineJudge from './LineJudge';
import PointAction from './PointAction';
import PointFetch from './PointFetch';
import PointJudge from './PointJudge';
import Vector from './Vector';

// ? 默认语境下Line是线段，当函数调用存在歧义时，通过参数控制Line当前的身份
class LineFetch {
  static getLengthOf(line) {
    return PointFetch.getDistanceBetween(line.startPoint, line.endPoint);
  }

  /**
   * 获取线的起点和终点组成的点数组
   * @param {*} line
   * @returns [Point]
   */
  // static getPointsOf(line) {
  //   return [line.startPoint, line.endPoint];
  // }

  // static getPointPosInLine(line, point, threshold) {
  //   if (PointJudge.isEqualBetween(line.startPoint, point, threshold)) {
  //     return LinePointDefine.startPoint;
  //   }
  //   if (PointJudge.isEqualBetween(line.endPoint, point, threshold)) {
  //     return LinePointDefine.endPoint;
  //   }
  //   return LinePointDefine.none;
  // }

  // static getEndPointByLPD(line, lpDef) {
  //   if (lpDef === LinePointDefine.startPoint) {
  //     return line.startPoint;
  //   }
  //   return line.endPoint;
  // }

  // static getAnotherEndPointByLPD(line, lpDef) {
  //   if (lpDef === LinePointDefine.startPoint) {
  //     return line.endPoint;
  //   }
  //   return line.startPoint;
  // }

  /**
   * 获取线位于最右侧的点
   * @param {*} line
   */
  static getRightPointOf(line) {
    const { startPoint: sp, endPoint: ep } = line;

    if (sp.x !== ep.x) {
      return sp.x > ep.x ? sp : ep;
    }
    return sp.y < ep.y ? sp : ep;
  }

  /**
   * 获取线的中点
   * @param {*} line
   * @returns
   */
  static getMiddlePointOf(line) {
    return PointAction.getMiddlePoint(line.startPoint, line.endPoint);
  }

  /**
   * 获取离Point最近的一个线的端点
   * @param {*} line
   * @param {*} point
   */
  static getNearestEndPoint(line, point) {
    const dis1 = PointFetch.getDistanceBetween(point, line.startPoint);
    const dis2 = PointFetch.getDistanceBetween(point, line.endPoint);

    return dis1 < dis2 ? line.startPoint : line.endPoint;
  }

  /**
   * 获取离Point最远的一个线的端点
   * @param {*} line
   * @param {*} point
   */
  static getFarthestEndPoint(line, point) {
    const dis1 = PointFetch.getDistanceBetween(point, line.startPoint);
    const dis2 = PointFetch.getDistanceBetween(point, line.endPoint);

    return dis1 > dis2 ? line.startPoint : line.endPoint;
  }

  /**
   * 返回点到直线的距离
   * @param {*} line
   * @param {*} point
   */
  static getDistanceFromPoint(line, point) {
    let x1 = line.startPoint.x;
    let y1 = line.startPoint.y;
    let x2 = line.endPoint.x;
    let y2 = line.endPoint.y;
    let x0 = point.x;
    let y0 = point.y;

    if (x1 === x2) {
      let dis = Math.abs(x0 - x1);
      return dis;
    } else if (y1 === y2) {
      let dis = Math.abs(y0 - y1);
      return dis;
    }

    let k = ((x1 === x2) ? 10000 : ((y2 - y1) / (x2 - x1)));// 当x1=x2时，给斜率设一个较大值10000
    let a = k;
    let b = -1;
    let c = y1 - (k * x1);

    let d = Math.abs((a * x0) + (b * y0) + c) / Math.sqrt((a * a) + (b * b));
    return d;
  }

  /**
   * 获取两条平行线之间的距离
   * @param {*} lineA
   * @param {*} lineB
   */
  static getDistanceBetweenParallelLine(lineA, lineB) {
    return this.getDistanceFromPoint(lineA, lineB.startPoint);
  }

  /**
   * 返回过点Point作line垂线的垂足
   * @param {*} line
   * @param {*} point
   */
  static getVerticalFoot(line, point) {
    let x1 = line.startPoint.x;
    let y1 = line.startPoint.y;
    let x2 = line.endPoint.x;
    let y2 = line.endPoint.y;
    let x0 = point.x;
    let y0 = point.y;

    if (x1 === x2) {
      return Factory.createPoint(x1, y0);
    } else if (y1 === y2) {
      return Factory.createPoint(x0, y1);
    }

    let k = ((x1 === x2) ? 10000 : ((y2 - y1) / (x2 - x1)));// 当x1=x2时，给斜率设一个较大值10000
    let a = k;
    let b = -1;
    let c = y1 - (k * x1);

    let px = ((b * b * x0) - (a * b * y0) - (a * c)) / ((a * a) + (b * b));
    let py = ((a * a * y0) - (a * b * x0) - (b * c)) / ((a * a) + (b * b));

    return Factory.createPoint(px, py);
  }

  /**
   * 获取两个线相互投影的长度
   * ! 感觉存在一定问题需要优化
   * @param {*} lineA
   * @param {*} lineB
   */
  static getProjectionLengthBetween(lineA, lineB) {
    let pdSelf1 = this.getVerticalFoot(lineA, lineB.startPoint);
    let pdSelf2 = this.getVerticalFoot(lineA, lineB.endPoint);
    let pdOther1 = this.getVerticalFoot(lineB, lineA.startPoint);
    let pdOther2 = this.getVerticalFoot(lineB, lineA.endPoint);
    let points = [];

    if (LineJudge.isLinePointInSegment(lineA, pdSelf1)) {
      points.push(pdSelf1);
      if (LineJudge.isLinePointInSegment(lineA, pdSelf2)) {
        points.push(pdSelf2);
      }
      if (LineJudge.isLinePointInSegment(lineB, pdOther1)) {
        points.push(lineA.startPoint);
      }
      if (LineJudge.isLinePointInSegment(lineB, pdOther2)) {
        points.push(lineA.endPoint);
      }
    } else if (LineJudge.isLinePointInSegment(lineA, pdSelf2)) {
      points.push(pdSelf2);
      if (LineJudge.isLinePointInSegment(lineB, pdOther1)) {
        points.push(lineA.startPoint);
      }
      if (LineJudge.isLinePointInSegment(lineB, pdOther2)) {
        points.push(lineA.endPoint);
      }
    } else if (LineJudge.isLinePointInSegment(lineB, pdOther1)) {
      points.push(pdOther1);
      if (LineJudge.isLinePointInSegment(lineB, pdOther2)) {
        points.push(pdOther2);
      }
    }

    if (points.length > 1) {
      let max = 0;
      for (let i = 0; i < points.length; i += 1) {
        let start = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          let end = points[j];
          let dis = PointFetch.getDistanceBetween(start, end);
          if (dis > max) {
            max = dis;
          }
        }
      }
      return max;
    }
    return 0;
  }

  /**
   * 获取两条平行线的重叠长度，即获取投影长度的特殊情况的简化算法
   * @param {*} lineA
   * @param {*} lineB
   */
  // static getOverlapLengthBetween(lineA, lineB) {
  //   if (!LineJudge.isParallelBetween(lineA, lineB)) return 0;

  //   const overlapX = ThreeUtils.getOverLayDistance(
  //     lineA.startPoint.x,
  //     lineA.endPoint.x,
  //     lineB.startPoint.x,
  //     lineB.endPoint.x,
  //   );
  //   const overlapY = ThreeUtils.getOverLayDistance(
  //     lineA.startPoint.y,
  //     lineA.endPoint.y,
  //     lineB.startPoint.y,
  //     lineB.endPoint.y,
  //   );
  //   return Math.sqrt((overlapX ** 2) + (overlapY ** 2));
  // }

  /**
   * 获得两直线的交点
   * @param {*} lineA
   * @param {*} lineB
   */
  static getIntersectionBetweenLines(lineA, lineB) {
    /** 1 解线性方程组, 求线段交点. * */
    // 如果分母为0 则平行或共线, 不相交
    let a = lineA.startPoint;
    let b = lineA.endPoint;
    let c = lineB.startPoint;
    let d = lineB.endPoint;

    if (LineJudge.isParallelBetween(lineA, lineB)) return undefined;

    let denominator = ((b.y - a.y) * (d.x - c.x)) - ((a.x - b.x) * (c.y - d.y));
    if (Math.round(denominator) === 0) {
      return undefined;
    }

    // 线段所在直线的交点坐标 (x , y)
    let x = ((((b.x - a.x) * (d.x - c.x) * (c.y - a.y))
      + ((b.y - a.y) * (d.x - c.x) * a.x))
      - ((d.y - c.y) * (b.x - a.x) * c.x)) / denominator;
    let y = -((((b.y - a.y) * (d.y - c.y) * (c.x - a.x))
      + ((b.x - a.x) * (d.y - c.y) * a.y))
      - ((d.x - c.x) * (b.y - a.y) * c.y)) / denominator;

    return { x, y };
  }

  /**
   * 获得两线段的交点
   * @param {*} segmentA
   * @param {*} segmentB
   */
  static getIntersectionBetweenSegments(segmentA, segmentB) {
    const point = this.getIntersectionBetweenLines(segmentA, segmentB);
    if (!point) return undefined;

    let { x, y } = point;

    let { startPoint: a, endPoint: b } = segmentA;
    let { startPoint: c, endPoint: d } = segmentB;

    let xr = Math.round(x);
    let yr = Math.round(y);
    let axr = Math.round(a.x);
    let ayr = Math.round(a.y);
    let bxr = Math.round(b.x);
    let byr = Math.round(b.y);
    let cxr = Math.round(c.x);
    let cyr = Math.round(c.y);
    let dxr = Math.round(d.x);
    let dyr = Math.round(d.y);

    /** 2 判断交点是否在两条线段上 * */
    if (
    // 交点在线段1上
      Math.round((xr - axr) * (xr - bxr)) <= 0 && Math.round((yr - ayr) * (yr - byr)) <= 0
      // 且交点也在线段2上
      && Math.round((xr - cxr) * (xr - dxr)) <= 0 && Math.round((yr - cyr) * (yr - dyr)) <= 0
    ) {
    // 返回交点p
      return { x, y };
    }

    // 否则不相交
    return undefined;
  }

  /**
   * 获取直线和线段的交点
   * @param {*} line
   * @param {*} segment
   */
  static getIntersectionBetweenLineAndSegment(line, segment) {
    const point = this.getIntersectionBetweenLines(line, segment);
    if (!point) return undefined;

    let { x, y } = point;

    let { startPoint: c, endPoint: d } = segment;

    let xr = Math.round(x);
    let yr = Math.round(y);

    let cxr = Math.round(c.x);
    let cyr = Math.round(c.y);
    let dxr = Math.round(d.x);
    let dyr = Math.round(d.y);

    /** 2 判断交点是否在线段上 * */
    if (Math.round((xr - cxr) * (xr - dxr)) <= 0 && Math.round((yr - cyr) * (yr - dyr)) <= 0) {
    // 返回交点p
      return { x, y };
    }

    // 否则不相交
    return undefined;
  }

  // * 斜率角度相关

  /**
   * 获取线的斜率，与X轴平行返回0，与Y轴平行返回最大值
   * @param {*} line
   * @param {*} reverse
   */
  static getSlopeOf(line, reverse = false) {
    let ox;
    let oy;
    if (reverse) {
      ox = line.startPoint.x - line.endPoint.x;
      oy = line.startPoint.y - line.endPoint.y;
    } else {
      ox = line.endPoint.x - line.startPoint.x;
      oy = line.endPoint.y - line.startPoint.y;
    }
    // let sign = ox > 0 ? 1 : -1;
    if (Math.abs(ox - 0) < 0.5) { // 直线与x轴垂直
      return Number.MAX_VALUE;
    } else if (Math.abs(oy - 0) < 0.5) { // 直线与x轴平行
      return 0;
    } // 其它情况
    return oy / ox;
  }

  /**
   * 获取线的斜率角度（弧度制）[-PI, PI]
   */
  static getSlopeRadOf(line) {
    let slope = this.getSlopeOf(line);

    if (slope === Number.MAX_VALUE) {
      if (line.startPoint.y > line.endPoint.y) {
        return Math.PI * 1.5;
      }
      return Math.PI * 0.5;
    } else if (slope === 0) {
      return 0;
    }
    return Math.atan(slope);
  }

  /**
   * 获取从startPoint到endPoint的方向的夹角弧度
   * @returns 返回值范围[0, 2π]
   */
  static getSlopeRadOf2(line) {
    let dx = line.endPoint.x - line.startPoint.x;
    let dy = line.endPoint.y - line.startPoint.y;
    let radian = Math.atan(dy / dx);
    if (dx < 0) {
      radian += Math.PI;
    }
    radian = (radian + (2 * Math.PI)) % (2 * Math.PI);
    return radian;
  }

  static getAngleBetweenTwoConnectedLine(lineA, lineB, connectPoint) {
    const point1 = PointJudge.isEqualBetween(connectPoint, lineA.startPoint) ? lineA.endPoint : lineA.startPoint;
    const point2 = PointJudge.isEqualBetween(connectPoint, lineB.startPoint) ? lineB.endPoint : lineB.startPoint;
    return PointFetch.getAngleDegFromPoints(connectPoint, point1, point2);
  }

  /**
   * 获取两线之间的锐角(弧度制)
   * @param {*} lienA
   * @param {*} lineB
   * @returns
   */
  static getAcuteAngleBetween(lienA, lineB) {
    let vec1 = { x: lienA.endPoint.x - lienA.startPoint.x, y: lienA.endPoint.y - lienA.startPoint.y };
    let vec2 = { x: lineB.endPoint.x - lineB.startPoint.x, y: lineB.endPoint.y - lineB.startPoint.y };
    let dot = Math.abs((vec1.x * vec2.x) + (vec1.y * vec2.y));
    let det = Math.sqrt((vec1.x ** 2) + (vec1.y ** 2)) * Math.sqrt((vec2.x ** 2) + (vec2.y ** 2));
    let angle = Math.acos(dot / det);
    return angle;
  }

  // * 向量相关

  /**
   * 获取line的向量
   * @param {*} line
   * @param {*} reverse
   * @returns { Vector }
   */
  static getVectorOf(line, reverse = false) {
    return reverse ? new Vector(line.endPoint, line.startPoint) : new Vector(line.startPoint, line.endPoint);
  }

  /**
   * 获取线的单位向量，传入length可以获取长度为Length的方向向量
   * @param {*} line
   * @param {*} length
   * @returns { Vector }
   */
  static getUnitVectorOf(line, length = 1) {
    return this.getVectorOf(line).normalize().multiplyScalar(length);
  }

  /**
   * 获取线的单位垂直向量
   * @param {*} line
   * @param {*} length
   * @returns { Vector }
   */
  static getUnitVerticalVectorOf(line, length) {
    return this.getUnitVectorOf(line, length).rotate(Math.PI / 2);
  }

  /**
   * 获取线向量旋转angle，且长度为length的向量(角度值)
   * @param {*} line
   * @param {*} angle
   * @param {*} length
   */
  static getVectorOfLineAfterRotateDeg(line, angle, length) {
    return this.getVectorOf(line).normalize().rotateDeg(angle).multiplyScalar(length);
  }

  /**
   * 获取两平行线之间的偏移向量
   * @param {*} lineA
   * @param {*} lineB
   */
  static getOffsetVectorBetweenParallelLines(lineA, lineB) {
    let foot = this.getVerticalFoot(lineA, lineB.startPoint);

    return new Vector(lineB.startPoint, foot);
  }

  static getEndPointByStartPointDisAndAnlge(sp, distance, angle) {
    let p = PointAction.addVector(sp, { x: 1000, y: 0 });
    let line = Factory.createLine(sp, p);
    let vec = this.getVectorOfLineAfterRotateDeg(line, angle, distance);
    return PointAction.addVector(sp, vec);
  }


  static getRectWithLineAndThickness(line, thickness) {
    let norvector = LineFetch.getUnitVerticalVectorOf(line);
    norvector.multiplyScalar(thickness / 2);
    let p1 = PointAction.addVector(line.startPoint, norvector);
    let p2 = PointAction.subVector(line.startPoint, norvector);
    let p3 = PointAction.subVector(line.endPoint, norvector);
    let p4 = PointAction.addVector(line.endPoint, norvector);

    return [p1, p2, p3, p4];
  }
}

export default LineFetch;

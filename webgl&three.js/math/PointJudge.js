import { isEqualForFloat } from '../utils/common.utils';
import PointFetch from './PointFetch';

class PointJudge {
  static isEqualBetween(pointA, pointB, threshold) {
    if (threshold) {
      return isEqualForFloat(pointA.x, pointB.x, threshold) && isEqualForFloat(pointA.y, pointB.y, threshold);
    }
    return isEqualForFloat(pointA.x, pointB.x) && isEqualForFloat(pointA.y, pointB.y);
  }

  // 此函数和上面的函数可以考虑合并统一
  static isApproximateEqual(pointA, pointB, threshold = 20) {
    const dis = PointFetch.getDistanceBetween(pointA, pointB);
    return dis <= threshold;
  }

  static isBiggerThan(pointA, pointB) {
    if (isEqualForFloat(pointA.x, pointB.x, 1)) {
      return (pointA.y - pointB.y) > 1;
    }
    return (pointA.x - pointB.x) > 1;
  }

  static isPointInArray(p, arr) {
    for (const itm of arr) {
      if (PointJudge.isEqualBetween(p, itm)) {
        return true;
      }
    }
    return false;
  }
}

export default PointJudge;

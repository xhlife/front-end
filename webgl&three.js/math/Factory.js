class Factory {
  static createPoint(x, y) {
    return { x, y };
  }

  static createLine(startPoint, endPoint) {
    return {
      startPoint,
      endPoint,
    };
  }

  static createCircle(center, radius) {
    return {
      center,
      radius,
    };
  }
}

export default Factory;

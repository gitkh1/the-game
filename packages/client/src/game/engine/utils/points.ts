type Point = {
  x: number;
  y: number;
};
type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export const distanceBetweenPoints = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
export const isPointInsideRect = (point: Point, rect: Rect) => {
  return rect.left <= point.x && point.x <= rect.right && rect.top <= point.y && point.y <= rect.bottom;
};

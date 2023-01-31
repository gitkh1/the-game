type T_Point = {
  x: number;
  y: number;
};
type T_Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export const distanceBetweenPoints = (a: T_Point, b: T_Point) => Math.hypot(a.x - b.x, a.y - b.y);
export const isPointInsideRect = (point: T_Point, rect: T_Rect) => {
  return rect.left <= point.x && point.x <= rect.right && rect.top <= point.y && point.y <= rect.bottom;
};

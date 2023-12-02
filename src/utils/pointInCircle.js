const isPointInCircle = (circle, point) => {
  const circleX = circle.x;
  const circleY = circle.y;
  const radius = circle.radius;
  const x = point.x;
  const y = point.y;

  const distanceFromCircle = Math.sqrt(
    Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)
  );

  if (distanceFromCircle <= radius) {
    return true;
  } else {
    return false;
  }
};

export default isPointInCircle

const isPointInANode = (nodes, point) => {
  const x = point.x;
  const y = point.y;

  return nodes.find((node) => {
    const nodeX = node.x;
    const nodeY = node.y;
    const radius = node.radius;
    const distanceFromNode = Math.sqrt(
      Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)
    );

    return distanceFromNode <= radius;
  });
};

export default isPointInANode;

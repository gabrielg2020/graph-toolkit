import { useState } from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import useNodes from '../hooks/useNodes';
import useEdges from '../hooks/useEdges';
import useCtrlKey from '../hooks/useCtrlKey';
import isPointInANode from '../utils/isPointInNode';
import {
  NODE_RADIUS,
  NODE_COLOR,
  EDGE_STROKE_COLOR,
  EDGE_STROKE_WIDTH,
} from '../constants/appConstants';

function InfiniteCanvas() {
  // local state
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(false);
  // hooked state
  const { nodes, addNode, highlightNode, resetNodeColor } = useNodes();
  const { edges, addEdge } = useEdges();
  const ctrlIsPressed = useCtrlKey();

  const handleDragEnd = (e) => {
    setStagePos({
      x: e.target.x(),
      y: e.target.y(),
    });
    console.log('dragged to end');
  };

  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const adjustedX = pointerPosition.x - stagePos.x;
    const adjustedY = pointerPosition.y - stagePos.y;

    const clickedNode = isPointInANode(nodes, {
      x: adjustedX,
      y: adjustedY,
    });

    if (ctrlIsPressed) {
      if (clickedNode === undefined) {
        // only if we clicked in a node
        return;
      } else {
        if (selectedNode === false) {
          // if we haven't selected
          highlightNode(clickedNode);
          setSelectedNode(clickedNode);
        } else {
          addEdge({
            startX: selectedNode.x,
            startY: selectedNode.y,
            endX: clickedNode.x,
            endY: clickedNode.y,
          });
          resetNodeColor();
          setSelectedNode(false);
        }
      }
    } else {
      addNode({
        id: uuidv4(),
        x: adjustedX,
        y: adjustedY,
        color: NODE_COLOR,
      });
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      onDragEnd={handleDragEnd}
      onClick={handleStageClick}
      x={stagePos.x}
      y={stagePos.y}
    >
      <Layer>
        {nodes.map((node) => (
          <Circle
            key={node.id}
            x={node.x}
            y={node.y}
            radius={NODE_RADIUS}
            fill={node.color}
          />
        ))}

        {edges.map((edge, i) => (
          <Line
            key={i}
            points={[edge.startX, edge.startY, edge.endX, edge.endY]}
            stroke={EDGE_STROKE_COLOR}
            strokeWidth={EDGE_STROKE_WIDTH}
          />
        ))}
      </Layer>
    </Stage>
  );
}
export default InfiniteCanvas;

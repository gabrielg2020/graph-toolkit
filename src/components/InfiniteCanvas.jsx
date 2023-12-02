import { useState } from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import useCtrlKey from '../hooks/useCtrlKey';
import isPointInCircle from '../utils/pointInCircle';

function InfiniteCanvas() {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(false)
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

    if (ctrlIsPressed) {
      // loop through each node
      const updatedCircles = circles.map((circle) => {
        if (isPointInCircle(circle, { x: adjustedX, y: adjustedY })) {
          if (selectedCircle === false) { // if we haven't selected a circle
            console.log(circle);
            setSelectedCircle(circle) // select circle
            return { ...circle, color: 'blue' };
          } else { // if we have selected a circle
            setLines([ // create the line
              ...lines, {
                startX: selectedCircle.x,
                startY: selectedCircle.y,
                endX: circle.x,
                endY: circle. y,
            }])
            setSelectedCircle(false) // unselect to go again
          }
        } else {
           setSelectedCircle(false) // if we have clicked in empty space unselect
        }
        return { ...circle, color:'red'};
      });
      setCircles(updatedCircles); // set state to new circles list

    } else {
      setCircles([
        ...circles,
        {
          x: adjustedX,
          y: adjustedY,
          radius: 30,
          color: 'red',
        },
      ]);
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
        {circles.map((circle, i) => (
          <Circle
            key={i}
            x={circle.x}
            y={circle.y}
            radius={circle.radius}
            fill={circle.color}
          />
        ))}

        {lines.map((line, i) => (
          <Line
            key={i}
            points={[line.startX, line.startY, line.endX, line.endY]}
            stroke={'black'}
            strokeWidth={'2'}
          />
        ))}
      </Layer>
    </Stage>
  );
}
export default InfiniteCanvas;

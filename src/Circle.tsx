import React from 'react';
import { Line } from '@react-three/drei';

interface CircleProps {
  arc?: number;
  color?: number | string;
  radius?: number;
  position?: [number, number, number];
  lineWidth?: number;
  opacity?: number;
  rotation?: [number, number, number];
}

const totalSegments = 2000;
const fullCircle = 2 * Math.PI;
const segmentAngle = fullCircle / totalSegments;

const Circle = ({
  arc = fullCircle,
  color = 0x000000,
  radius = 1,
  position = [0, 0, 0],
  lineWidth = 2,
  opacity = 1,
  rotation = [0, 0, 0],
}: CircleProps) => {
  const arcSegments = Math.ceil((arc / fullCircle) * totalSegments);
  const points: Array<[number, number, number]> = new Array(arcSegments)
    .fill(0)
    .map((_, i) => [
      Math.cos(i * segmentAngle) * radius,
      0,
      Math.sin(i * segmentAngle) * radius,
    ]);

  return points.length ? (
    <Line
      position={position}
      points={points}
      lineWidth={lineWidth}
      color={color}
      opacity={opacity}
      rotation={rotation}
    />
  ) : null;
};

export default Circle;

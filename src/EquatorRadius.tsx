import React from 'react';
import { Line } from '@react-three/drei';

interface EquatorRadiusProps {
  zRotation?: number;
}

const EquatorRadius = ({ zRotation = 0 }: EquatorRadiusProps) => {
  const x = 2.5;

  return (
    <Line
      points={[
        [0, 0, 0],
        [x * Math.cos(zRotation), x * Math.sin(zRotation), 0],
        [(x - .1) * Math.cos(zRotation), (x - .1) * Math.sin(zRotation), .05],
        [(x - .1) * Math.cos(zRotation), (x - .1) * Math.sin(zRotation), -.05],
        [x * Math.cos(zRotation), x * Math.sin(zRotation), 0],
      ]}
      lineWidth={2}
      color="coral"
    />
  );
};

export default EquatorRadius;

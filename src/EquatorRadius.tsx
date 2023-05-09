import React, { useContext, useState } from 'react';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import state from './state';

interface EquatorRadiusProps {
  zRotation?: number;
}

const EquatorRadius = ({ zRotation = 0 }: EquatorRadiusProps) => {
  const step = useContext(state);
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

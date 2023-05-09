import { Line } from '@react-three/drei';
import React from 'react';

const LatitudeRadius = () => {
  return (
    <Line
      lineWidth={2}
      color="coral"
      points={[
        [0, Math.sin(Math.PI / 3) * 2.5, 0],
        [Math.cos(Math.PI / 3) * 2.5, Math.sin(Math.PI / 3) * 2.5, 0],
        [Math.cos(Math.PI / 3) * 2.5 - 0.1, Math.sin(Math.PI / 3) * 2.5, 0.05],
        [Math.cos(Math.PI / 3) * 2.5 - 0.1, Math.sin(Math.PI / 3) * 2.5, -0.05],
        [Math.cos(Math.PI / 3) * 2.5, Math.sin(Math.PI / 3) * 2.5, 0],
      ]}
    />
  );
};

export default LatitudeRadius;

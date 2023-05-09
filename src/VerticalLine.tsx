import { Line } from '@react-three/drei';
import React from 'react';

const VerticalLine = () => {
  return (
    <Line
      color="coral"
      points={[
        [0, 0, 0],
        [0, 2.5 * Math.sin(Math.PI / 3), 0],
      ]}
      lineWidth={2}
    />
  );
};

export default VerticalLine;

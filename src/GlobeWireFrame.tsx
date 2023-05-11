import React, { useState } from 'react';
import Circle from './Circle';
import { useFrame } from '@react-three/fiber';

const GlobeWireFrame = () => {
  const [angle, setAngle] = useState(0);

  useFrame((_, delta) => {
    setAngle(angle + delta / 2);
  });

  return (
    <group rotation-y={angle}>
      {new Array(33)
        .fill(0)
        .map((_, i) => (((i - 16) / 16) * Math.PI) / 2)
        .filter((latitude) => latitude !== 0)
        .map((latitude) => (
          <Circle
            lineWidth={0.3}
            opacity={0.5}
            radius={Math.cos(latitude) * 2.5}
            position={[0, Math.sin(latitude) * 2.5, 0]}
            key={latitude}
          />
        ))}
      {new Array(24)
        .fill(0)
        .map((_, i) => (Math.PI / 12) * i)
        .map((zRotation) => (
          <Circle
            lineWidth={0.3}
            opacity={0.5}
            radius={2.5}
            rotation={[Math.PI / 2, 0, zRotation]}
            key={zRotation}
          />
        ))}
    </group>
  );
};

export default GlobeWireFrame;

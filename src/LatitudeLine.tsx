import React, { useContext, useState } from 'react';
import Circle from './Circle';
import { useFrame } from '@react-three/fiber';
import state from './state';

const latitudeLine = () => {
  const step = useContext(state);
  const [y, setY] = useState(0);
  const [radius, setRadius] = useState(2.51);

  useFrame((_, delta) => {
    switch (step) {
      case 'dayNight':
      case 'day':
      case 'equatorLine':
      case 'speedCalculation':
        break;
      case 'latitude':
        if (radius <= 1.255) {
          return;
        }
        setRadius(radius - delta);
        setY(Math.sqrt(2.51 ** 2 - radius ** 2));
        break;
      case 'halfSpeed':
      case 'latitudeLength':
        break;
      default:
        const _impossible: never = step;
        return _impossible;
    }
  });

  let lineWidth = 2;
  let opacity = 1;

  switch (step) {
    case 'latitudeLength':
      lineWidth = 0.3;
      opacity = 0.5;
      break;
  }
  return (
    <Circle
      position={[0, y, 0]}
      radius={radius}
      color="coral"
      lineWidth={lineWidth}
      opacity={opacity}
    />
  );
};

export default latitudeLine;

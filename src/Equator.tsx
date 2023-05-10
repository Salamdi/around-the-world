import React, { useContext, useState } from 'react';
import Circle from './Circle';
import state from './state';
import { useFrame } from '@react-three/fiber';

const Equator = () => {
  const step = useContext(state);
  const [arc, setArc] = useState(0);

  useFrame((_, delta) => {
    switch (step) {
      case 'dayNight':
      case 'day':
        break;
      case 'equatorLine':
        if (arc >= 2 * Math.PI) {
          return;
        }
        setArc(arc + delta * 2);
        break;
      case 'halfSpeed':
      case 'latitude':
      case 'latitudeLength':
      case 'speedCalculation':
      case 'init':
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
    case 'latitude':
    case 'halfSpeed':
    case 'dayNight':
      lineWidth = 0;
      break;
  }

  return (
    <Circle
      radius={2.51}
      color="coral"
      arc={arc}
      lineWidth={lineWidth}
      opacity={opacity}
    />
  );
};

export default Equator;

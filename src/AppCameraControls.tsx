import React, { MutableRefObject, useContext, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import state from './state';
import { useFrame } from '@react-three/fiber';

const AppCameraControls = () => {
  const step = useContext(state);
  const ref = useRef<CameraControls>() as MutableRefObject<CameraControls>;
  switch (step) {
    case 'dayNight':
      ref.current?.rotatePolarTo(Math.PI / 2, true);
      ref.current?.rotateAzimuthTo(0, true);
    case 'latitudeLength':
    case 'equatorLine':
    case 'init':
      break;
    case 'day':
      ref.current.rotateAzimuthTo(Math.PI / 2, true);
      break;
    case 'speedCalculation':
      ref.current.rotate(0, -Math.PI / 2, true);
      break;
    case 'latitude':
      ref.current.rotatePolarTo(Math.PI / 3, true);
      break;
    case 'halfSpeed':
      ref.current.rotatePolarTo(-Math.PI, true);
      break;
    default:
      const _impossible: never = step;
      return _impossible;
  }
  useFrame((_, delta) => {
    switch (step) {
      case 'dayNight':
        break;
      case 'day':
        break;
      case 'equatorLine':
        ref.current.azimuthAngle -= delta * 2;
        break;
      case 'speedCalculation':
      case 'init':
      case 'halfSpeed':
      case 'latitude':
      case 'latitudeLength':
        break;
      default:
        const _impossible: never = step;
        return _impossible;
    }
  });

  return <CameraControls ref={ref} />;
};

export default AppCameraControls;

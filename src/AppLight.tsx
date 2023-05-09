import React, { MutableRefObject, useContext, useRef, useState } from 'react';
import state from './state';
import { useFrame } from '@react-three/fiber';
import { DirectionalLight, Vector3 } from 'three';

const origin = new Vector3(0, 0, 0);
const lightDistance = 20;
const position: [number, number, number] = [lightDistance, 0, 0];

const AppLights = () => {
  const [azimuth, setAzimuth] = useState(0);
  const ref = useRef() as MutableRefObject<DirectionalLight>;
  const step = useContext(state);
  useFrame((_, delta) => {
    switch (step) {
      case 'dayNight':
        break;
      case 'day':
        break;
      case 'equatorLine':
        setAzimuth(azimuth + delta);
        const x = Math.cos(azimuth) * lightDistance;
        const z = Math.sin(azimuth) * lightDistance;
        ref.current.position.setX(x);
        ref.current.position.setZ(z);
        ref.current.lookAt(origin);
        break;
      case 'halfSpeed':
      case 'latitude':
      case 'latitudeLength':
      case 'speedCalculation':
        break;
      default:
        const _impossible: never = step;
        return _impossible;
    }
  });

  if (step === 'halfSpeed') {
    ref.current.position.set(lightDistance, 0, 0);
    ref.current.lookAt(origin);
  }

  return (
    <>
      <directionalLight position={position} intensity={3} ref={ref} />
      <ambientLight intensity={0.1} />
    </>
  );
};

export default AppLights;

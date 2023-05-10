import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import { Clock, Group, Vector3 } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import NasaGLBEarth from './assets/models/Earth_1_12756.glb';
import State from './state';

const Globe = () => {
  const gltf = useLoader(GLTFLoader, NasaGLBEarth);
  const step = useContext(State);
  const [yRotation, setRotation] = useState(Math.PI / 2);

  useFrame((_, delta) => {
    switch (step) {
      case 'day':
      case 'dayNight':
        setRotation(yRotation + delta * 2);
        break;
      case 'equatorLine':
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

  const visible =
    step !== 'speedCalculation' &&
    step !== 'latitudeLength' &&
    step !== 'halfSpeed';

  return (
    <group
      position={[0, 0, 0]}
      scale={0.005}
      rotation-y={yRotation}
      visible={visible}
    >
      <primitive object={(gltf as GLTF).scene.children[0]} />
    </group>
  );
};

export default Globe;

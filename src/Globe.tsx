import React, { useContext, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import NasaGLBEarth from './assets/models/Earth_1_12756.glb';
import State from './State';

const Globe = () => {
  const gltf = useLoader(GLTFLoader, NasaGLBEarth);
  const step = useContext(State);
  const [yRotation, setRotation] = useState(Math.PI / 2);

  useFrame((_, delta) => {
    switch (step) {
      case 'day':
      case 'dayNight':
      case 'latitude':
        setRotation(yRotation + delta * 2);
        break;
      case 'init':
      case 'equatorLine':
      case 'halfSpeed':
      case 'latitudeLength':
      case 'speedCalculation':
        break;
      default: {
        const _impossible: never = step;
        return _impossible;
      }
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

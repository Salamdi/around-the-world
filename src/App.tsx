import React, { MutableRefObject, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import NasaGLBEarth from './assets/models/Earth_1_12756.glb';
import { CameraControls, Line, OrbitControls, Stars } from '@react-three/drei';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Group,
  MathUtils,
  DirectionalLight,
  OrthographicCamera,
  Vector3,
  BufferGeometry,
} from 'three';
import { button, buttonGroup, useControls } from 'leva';
import Globe from './Globe';
import State, { Step } from './state';
import AppCameraControls from './AppCameraControls';
import AppLights from './AppLight';
import Equator from './Equator';
import EquatorRadius from './EquatorRadius';
import LatitudeLine from './LatitudeLine';
import Circle from './Circle';
import VerticalLine from './VerticalLine';
import LatitudeRadius from './LatitudeRadius';

const start = new Vector3(0, 0, 0);
const end = new Vector3(2.5, 0, 0);
const geometry = new BufferGeometry().setFromPoints([start, end]);

const App = () => {
  const [step, setStep] = useState<Step>('dayNight');
  useControls({
    dayNight: button(() => setStep('dayNight')),
    day: button(() => setStep('day')),
    equatorLine: button(() => setStep('equatorLine')),
    speedCalculation: button(() => setStep('speedCalculation')),
    latitude: button(() => setStep('latitude')),
    latitudeLength: button(() => setStep('latitudeLength')),
    halfSpeed: button(() => setStep('halfSpeed')),
  });

  window['setStep'] = setStep;

  const latitudeLineVisible =
    step === 'latitude' || step === 'latitudeLength' || step === 'halfSpeed';

  return (
    <State.Provider value={step}>
      <AppCameraControls />
      <color attach="background" args={['#15151a']} />
      <AppLights />
      <group scale={[0.6, 0.6, 0.6]}>
        <Globe />
        <Equator />
        {latitudeLineVisible ? <LatitudeLine /> : null}
        {step !== 'halfSpeed' && step !== 'day' ? <EquatorRadius /> : null}
        {step === 'latitudeLength' ? (
          <EquatorRadius zRotation={Math.PI / 3} />
        ) : null}
        {step === 'latitudeLength' ? <VerticalLine /> : null}
        {latitudeLineVisible ? <LatitudeRadius /> : null}
        {step === 'latitudeLength'
          ? new Array(33)
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
              ))
          : null}
        {step === 'latitudeLength'
          ? new Array(24)
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
              ))
          : null}
        <Stars />
      </group>
    </State.Provider>
  );
};

export default App;

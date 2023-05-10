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
import State, { Step, stepEndTime } from './state';
import AppCameraControls from './AppCameraControls';
import AppLights from './AppLight';
import Equator from './Equator';
import EquatorRadius from './EquatorRadius';
import LatitudeLine from './LatitudeLine';
import Circle from './Circle';
import VerticalLine from './VerticalLine';
import LatitudeRadius from './LatitudeRadius';

let start = 0;

const App = () => {
  const [step, setStep] = useState<Step>('init');
  useControls({
    start: button(() => {
      setStep('dayNight');
    }),
  });

  useFrame(({ clock }) => {
    if (step === 'init') {
      start = clock.getElapsedTime();
      return;
    }
    const time = (clock.getElapsedTime() - start) * 1000;
    if (time >= (stepEndTime.get('halfSpeed') as number)) {
      setStep('dayNight');
    }
    if (
      time >= (stepEndTime.get('latitudeLength') as number) &&
      time < (stepEndTime.get('halfSpeed') as number)
    ) {
      setStep('halfSpeed');
    }
    if (
      time >= (stepEndTime.get('latitude') as number) &&
      time < (stepEndTime.get('latitudeLength') as number)
    ) {
      setStep('latitudeLength');
    }
    if (
      time >= (stepEndTime.get('speedCalculation') as number) &&
      time < (stepEndTime.get('latitude') as number)
    ) {
      setStep('latitude');
    }
    if (
      time >= (stepEndTime.get('equatorLine') as number) &&
      time < (stepEndTime.get('speedCalculation') as number)
    ) {
      setStep('speedCalculation');
    }
    if (
      time >= (stepEndTime.get('day') as number) &&
      time < (stepEndTime.get('equatorLine') as number)
    ) {
      setStep('equatorLine');
    }
    if (
      time >= (stepEndTime.get('dayNight') as number) &&
      time < (stepEndTime.get('day') as number)
    ) {
      setStep('day');
    }
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

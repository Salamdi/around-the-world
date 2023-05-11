import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { button, useControls } from 'leva';
import Globe from './Globe';
import State, { Step, stepEndTime } from './State';
import AppCameraControls from './AppCameraControls';
import AppLights from './AppLight';
import Equator from './Equator';
import EquatorRadius from './EquatorRadius';
import LatitudeLine from './LatitudeLine';
import VerticalLine from './VerticalLine';
import LatitudeRadius from './LatitudeRadius';
import GlobeWireFrame from './GlobeWireFrame';

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
        {step === 'latitudeLength' || step === 'halfSpeed' ? <LatitudeRadius /> : null}
        {step === 'latitudeLength'
          ? <GlobeWireFrame />
          : null}
        <Stars />
      </group>
    </State.Provider>
  );
};

export default App;

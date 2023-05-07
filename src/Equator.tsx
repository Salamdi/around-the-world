import React, { MutableRefObject, Ref, useRef, useState } from 'react';
import { button, useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { Mesh, AnimationClip, NumberKeyframeTrack, TorusGeometry } from 'three';
import { SLOW_FACTOR } from './Globe';
import { useAnimations } from '@react-three/drei';

const fullCircle = 2 * Math.PI;
const MAX_LONGITUDE = Math.PI / 3;
const DURATION = 1000 / SLOW_FACTOR;
const KF_MAX_IDX = 1000;
const KF_TIMES = new Array(KF_MAX_IDX + 1).fill(0).map((_, i) => i / DURATION);
const KF_BASE = KF_TIMES.map((_, i) => (i / KF_MAX_IDX) * MAX_LONGITUDE);
const raduisValues = KF_BASE.map((phi) => Math.cos(phi));
const yValues = KF_BASE.map((phi) => [0, Math.sin(phi), 0]).flat();

const radiusKF = new NumberKeyframeTrack(
  '.geometry.parameters.radius',
  KF_TIMES,
  raduisValues
);
const yKF = new NumberKeyframeTrack('.position', KF_TIMES, yValues);

const longitudeClip = new AnimationClip('lngMv', -1, [yKF, radiusKF]);

const RADIUS = 2.5;

interface EquatorProps {
  draw: boolean;
}

const Equator = ({ draw }: EquatorProps) => {
  const [arc, setArc] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [radius, setRadius] = useState(RADIUS);

  useControls({
    play: button(() => {
        setAnimate(true);
    }),
  });

  useFrame((_, delta) => {
    if (!draw) {
      setArc(0);
      return;
    }
    if (arc < fullCircle) {
      setArc(arc + delta / SLOW_FACTOR);
    }
    if (animate) {
        if (radius <= RADIUS / 2) {
            setAnimate(false);
            return;
        }
        setRadius(radius - delta);
    }
  });

  return (
    <mesh rotation-x={Math.PI / 2} position-y={Math.sqrt(RADIUS ** 2 - radius ** 2)}>
      <torusGeometry args={[radius, 0.01, 60, 60, arc]} />
      <meshBasicMaterial color={'coral'} />
    </mesh>
  );
};

export default Equator;

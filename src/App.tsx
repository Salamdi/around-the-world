import React, { MutableRefObject, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import NasaGLBEarth from './assets/models/Earth_1_12756.glb';
import { CameraControls, OrbitControls, Stars } from '@react-three/drei';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group, MathUtils, DirectionalLight, OrthographicCamera } from 'three';
import { button, buttonGroup, useControls } from 'leva';
import Globe, { SLOW_FACTOR } from './Globe';
import Equator from './Equator';

const App = () => {
    const cameraControlsRef = useRef<CameraControls>() as MutableRefObject<CameraControls>;
    const lightRef = useRef() as MutableRefObject<DirectionalLight>;
    const { spin, drawEquator } = useControls('Spin Globe', { spin: true, drawEquator: false });
    const [visible, setVisible] = useState(true);
    useFrame((_, delta) => {
        if (!spin) {
            cameraControlsRef.current.azimuthAngle -= delta / SLOW_FACTOR;
            lightRef.current.rotation.y -= delta / SLOW_FACTOR;
            cameraControlsRef.current.getPosition(lightRef.current.position);
        }
    });
    const res = useControls({
        thetaGroup: buttonGroup({
            label: 'rotate y',
            opts: {
                '90°': () => cameraControlsRef.current.rotate(Math.PI / 2, 0, true),
            }
        }),
        phiGroup: buttonGroup({
            label: 'show equator',
            opts: {
                '+90°': () => {
                    cameraControlsRef.current.rotate(0, Math.PI / 2, true);
                    setVisible(false);
                },
                '-90°': () => {
                    cameraControlsRef.current.rotate(0, - Math.PI / 2, true);
                    setVisible(true);
                },
            },
        }),
    });

    return (
        <>
            <CameraControls
                ref={cameraControlsRef}
            />
            <color attach="background" args={['#15151a']} />
            <directionalLight position={[20, 0, 0]} intensity={3} ref={lightRef} />
                <Globe spin={spin} visible={visible} />
                <Equator draw={drawEquator} />
            <Stars />
        </>
    );
};

export default App;

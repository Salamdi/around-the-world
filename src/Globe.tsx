import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import { Clock, Group, Vector3 } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import NasaGLBEarth from './assets/models/Earth_1_12756.glb';

interface GlobeProps {
    spin: boolean;
    visible: boolean;
}

export const SLOW_FACTOR = 4;

const Globe = ({ spin, visible }: GlobeProps) => {
    const gltf = useLoader(GLTFLoader, NasaGLBEarth);
    const globeRef = useRef() as MutableRefObject<Group>;

    useFrame((_, delta) => {
        if (!spin) {
            return;
        }
        globeRef.current.rotation.y += delta / SLOW_FACTOR;
    });

    return (
        <group position={[0, 0, 0]} scale={.005} ref={globeRef} visible={visible} >
            <primitive
                object={(gltf as GLTF).scene.children[0]}
            />
        </group>
    );
};

export default Globe;

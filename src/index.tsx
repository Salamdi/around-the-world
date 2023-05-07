import React from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as Element);
root.render(<Canvas><App /></Canvas>);

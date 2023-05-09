import { createContext } from 'react';

export type Step =
    | 'dayNight'
    | 'day'
    | 'equatorLine'
    | 'speedCalculation'
    | 'latitude'
    | 'latitudeLength'
    | 'halfSpeed';

export const stepDuration: Map<Step, number> = new Map([
    ['dayNight', 4000],
    ['day', 5000],
    ['equatorLine', 5000],
    ['speedCalculation', 8000],
    ['latitude', 5000],
    ['latitudeLength', 8000],
    ['halfSpeed', 8000],
]);

export default createContext<Step>('dayNight');

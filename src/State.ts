import { createContext } from 'react';

export type Step =
    | 'init'
    | 'dayNight'
    | 'day'
    | 'equatorLine'
    | 'speedCalculation'
    | 'latitude'
    | 'latitudeLength'
    | 'halfSpeed';

export const stepEndTime: Map<Step, number> = new Map([
    ['init', Infinity],
    ['dayNight', 2200],
    ['day', 2500],
    ['equatorLine', 6500],
    ['speedCalculation', 13500],
    ['latitude', 28000],
    ['latitudeLength', 32000],
    ['halfSpeed', 37000],
]);

export default createContext<Step>('init');

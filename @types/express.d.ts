import { MetricsLogger } from 'aws-embedded-metrics';

export declare module 'express' {
    export interface Request {
        metrics?: MetricsLogger;
    }
}

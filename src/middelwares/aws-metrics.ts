import { Configuration, Unit, createMetricsLogger } from 'aws-embedded-metrics';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDurationInMilliseconds } from '../utils.js';

Configuration.serviceName = process.env.APP_NAME;
Configuration.serviceType = 'NodeJS';

export const awsMetrics = (req: Request, res: Response, next: NextFunction) => {
    const metrics = createMetricsLogger();

    const startTime = process.hrtime();
    const appName = process.env.APP_NAME;
    const envString = process.env.NODE_ENV;

    if (!appName || !envString) {
        return next();
    }

    req.metrics = metrics;

    metrics.setNamespace(appName);
    metrics.setDimensions({ service: `${appName}-${envString}`, path: req.path });
    metrics.setProperty('method', req.method);
    metrics.setProperty('path', req.path);

    const requestId = req.headers[`x-${appName.toLowerCase()}-request-id`] || uuidv4();

    metrics.setProperty('requestId', requestId);

    res.on('finish', () => {
        if (res.statusCode === 404) {
            // don't log any metrics for bots that are probing your server for non-existent endpoints
            return;
        }

        metrics.setProperty('statusCode', res.statusCode);
        metrics.putMetric('latency', getDurationInMilliseconds(startTime), Unit.Milliseconds);
        metrics.putMetric('requestCount', 1, Unit.Count);

        if (res.statusCode >= 400 && res.statusCode < 500 && res.statusCode !== 404) {
            metrics?.putMetric('4XX', 1, Unit.Count);
        }

        if (res.statusCode >= 500) {
            metrics.putMetric('5XX', 1, Unit.Count);
        }

        metrics.flush().catch((e) => console.log('error flushing metrics', e));
    });

    next();
};

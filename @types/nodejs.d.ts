namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'prod' | 'staging' | 'dev';
        APP_NAME: string;
    }
}

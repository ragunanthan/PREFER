// @flow Copyright ©2021 ICS. All Rights Reserved.

const log = (...args: any) => {
    console.log(...args);
};

const info = (...args: any) => {
    console.log('# logger.info(): ');
    console.log(...args);
};

const error = (message: string, error?: Error) => {
    console.log('# logger.error(): ');
    console.log(message);
};

export const logger = {
    log,
    info,
    error
};

// @flow Copyright ©2021 ICS. All Rights Reserved.

const log = (...args: any) => {
    console.log(...args);
};

const info = (...args: any) => {
    console.log('# logger.info');
    console.log(...args);
};

const error = (message: string, error?: Error) => {
    console.log('# logger.error');
    console.log(message);
};
const table = (message: string, error?: Error) => {
    console.log('# logger.table');
    console.table(message);
};

export const logger = {
    log,
    info,
    error,
    table
};

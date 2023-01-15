// @flow Copyright ©2021 ICS. All Rights Reserved.
import * as Keychain from 'react-native-keychain';
import { logger } from '../utils/logger';

const { Sema } = require('async-sema');

const s = new Sema(1, { capacity: 100 });

export const setSecureData = async (key: string, value: string) => {
    await s.acquire();
    try {
        await Keychain.setGenericPassword(key, value);
        logger.info('setSecureData done', key);
        if (__DEV__) {
            logger.info(value);
        }

        return;
    } catch (error: any) {
        logger.error('Error in setSecureData():', error);
        throw new Error(error.message);
    } finally {
        s.release();
    }
};

export const getSecureData = async (key: string) => {
    await s.acquire();

    try {
        const value = await Keychain.getGenericPassword();
        logger.info('in getSecureData', key);
        if (__DEV__) {
            logger.info(value);
        }

        return value ? JSON.parse(value.password) : undefined;
    } catch (error:any) {
        logger.error('Error in getSecureData():', error);
        throw new Error(error.message);
    } finally {
        s.release();
    }

};

export const removeSecureData = async (key: string) => {
    await s.acquire();

    try {

        await Keychain.resetGenericPassword({ service : key });
    } catch (error: any) {
        logger.error('Error in removeSecureData():', error);
        throw new Error(error.message);
    } finally {
        s.release();
    }

};


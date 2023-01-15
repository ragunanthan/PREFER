// @flow Copyright ©2021 ICS. All Rights Reserved.

import { getSecureData, removeSecureData, setSecureData } from "./secureStorage";

const USER_DATA = "USER_DATA";
const SESSION = "SESSION";

let userDataCache: any = null;

interface userPropsType {
    setSession: (appSessionExpiryTime: number) => void,
    getSession: () => Promise<string | void>,
    login: (userData: any) => void,
    logout: () => void,
    isLoggedIn: () => Promise<boolean>,
    getAllUserData: () => Promise<Object>,
    setRefreshToken: (refresh_token: string) => void,
    getRefreshToken: () =>  Promise<string | void>,
    getAccessToken: () =>  Promise<string | void>,
    setAccessToken: (access_token: string) => void,
}

export const user: userPropsType = {

    setSession: async (appSessionExpiryTime: number) => {
        await setSecureData(SESSION, JSON.stringify({ appSessionExpiryTime }));
    },

    getSession: async (): Promise<string | void> => {
        const data = await getSecureData(SESSION);
        if (data) {
            return data.appSessionExpiryTime;
        }
    },

    // Login, Logout
    login: async (userData: any) => {
        const data = JSON.stringify(userData);
        await setSecureData(USER_DATA, data);
        userDataCache = userData;
    },
    logout: async () => {
        await removeSecureData(USER_DATA);
        userDataCache = null;
    // cancelAllNotification();
    },
    isLoggedIn : async (): Promise<boolean> => {
        if (userDataCache && Object.keys(userDataCache).length > 0) {
            return Boolean(userDataCache);
        }
        const userData = await getSecureData(USER_DATA);
        if (userData) {
            userDataCache = userData;

            return true;
        } else {
            return false;
        }
    },

    // For getting all data
    getAllUserData: async (): Promise<Object> => {
        if (userDataCache && Object.keys(userDataCache).length > 0) {
            return userDataCache;
        }
        const userData = await getSecureData(USER_DATA);
        let userDataObject = {};

        // when no data is available getSecureData returns `false`, then return empty data.
        if (userData) {
            userDataObject = userData;
            userDataCache = userDataObject;
        }

        return userDataObject;
    },

    // Refresh Token Related

    setRefreshToken: async (refresh_token: string) => {
        const userData = await getSecureData(USER_DATA);
        userData.refresh_token = refresh_token;
        await setSecureData(USER_DATA, JSON.stringify(userData));
        userDataCache = userData;
    },

    getRefreshToken: async (): Promise<string | void> => {
        if (userDataCache && Object.keys(userDataCache).length > 0) {
            return userDataCache.refresh_token;
        }
        const userData = await getSecureData(USER_DATA);

        if (userData) {
            userDataCache = userData;

            return userData.refresh_token;
        }
    },

    // Access Token Related
    getAccessToken: async (): Promise<string | void> => {
        if (userDataCache && Object.keys(userDataCache).length > 0) {
            return userDataCache.access_token;
        }
        const userData = await getSecureData(USER_DATA);

        if (userData) {
            userDataCache = userData;

            return userData.access_token;
        }
    },

    setAccessToken: async (access_token: string) => {
        const userData = await getSecureData(USER_DATA);
        userData.access_token = access_token;
        await setSecureData(USER_DATA, JSON.stringify(userData));
        userDataCache = userData;

    },


};

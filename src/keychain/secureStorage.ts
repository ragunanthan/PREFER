// @flow Copyright ©2021 ICS. All Rights Reserved.
import EncryptedStorage from "react-native-encrypted-storage";
import { logger } from "../utils/logger";

export const setSecureData = async (key: string, value: any) => {
  try {
    return await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    logger.error("Error in setSecureData():", error);
    throw new Error(error.message);
  }
};

export const getSecureData = async (key: string) => {
  try {
    const session =  await EncryptedStorage.getItem(key);

    return session ? JSON.parse(session) : null;
  } catch (error: any) {
    logger.error("Error in getSecureData():", error);
    throw new Error(error.message);
  }
};

export const removeSecureData = async (key: string) => {
  try {
    return await EncryptedStorage.removeItem(key);
  } catch (error: any) {
    logger.error("Error in removeSecureData():", error);
    throw new Error(error.message);
  }
};

export const removeAllSecureData = async () => {
    try {
      return await EncryptedStorage.clear();
    } catch (error: any) {
      logger.error("Error in removeAllSecureData():", error);
      throw new Error(error.message);
    }
  };
  
import React, { useState, useContext, useMemo } from "react";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { getSecureData, setSecureData } from "../keychain/secureStorage";
import { logger } from "../utils/logger";

type AppContexttype = {
  userState: null | {
    accessToken: string;
    refreshToken: string;
    email: string;
    userId: number;
    name : string;
    isAdmin : boolean;
  };
  setUserState: React.Dispatch<React.SetStateAction<null>>;
  showLogin : boolean;
  setShowLogin :  React.Dispatch<React.SetStateAction<boolean>>;
};
export const AppContext = React.createContext<AppContexttype>({
  userState: null,
  setUserState: () => {},
  showLogin: false,
  setShowLogin: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function AppContextProvier({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [userState, setUserState] = useState(null);
  const state = useMemo(
    () => ({ userState, setUserState, showLogin, setShowLogin }),
    [ userState, setUserState, showLogin, setShowLogin ]
  );

  React.useEffect(() => {
    getUserDataFromStorage();
  }, []);

  async function getUserDataFromStorage() {
    try {
      let data: any = await getSecureData("userData");

      if (data?.userId && data?.refreshToken) {
        let accessToken = await fetcher.post(ENDPOINTS.REFERSH_TOKEN, {
          userId: data?.userId,
          refreshToken: data?.refreshToken,
        });
        setUserState({
            ...data,
            accessToken: accessToken.data.accessToken,
          });
        setSecureData("userData", {
          ...data,
          accessToken: accessToken.data.accessToken,
        });
        fetcher.defaults.headers["authorization"] =  `Bearer ${accessToken.data.accessToken}`;
        fetcher.defaults.headers["userId"] =   data?.userId;
      }
    } catch (err: any) {
      logger.error(err);
    }
  }
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

import React, { Context, useContext, useMemo } from "react";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { getSecureData, setSecureData } from "../keychain/secureStorage";
import { logger } from "../utils/logger";

type AppContexttype = {
  userState: null | {
    accessToken: string;
    refreshToken: string;
    email: string;
    userId: number;
  };
  setUserState: React.Dispatch<React.SetStateAction<null>>;
};
const AppContext = React.createContext<AppContexttype>({
  userState: null,
  setUserState: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function AppContextProvier({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userState, setUserState] = React.useState(null);
  const state = useMemo(
    () => ({ userState, setUserState }),
    [userState, setUserState]
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
      }
    } catch (err: any) {
      logger.error(err);
    }
  }
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

import { ENDPOINTS, fetcher } from "./Fetcher";

type loginType = {
  email: string;
  password: string;

  userName?: string;
};
export async function login(body: loginType) {
    return fetcher.post(ENDPOINTS.LOGIN, JSON.stringify(body));
}

export async function signup(body: loginType) {
    return fetcher.post(ENDPOINTS.SIGNUP, JSON.stringify(body));
}

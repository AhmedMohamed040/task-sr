'use server';
import { cookies } from 'next/headers';
import { endpoints } from 'src/utils/axios';
import { postData } from 'src/utils/crud-fetch-api';

const SESSION_PERIOD = 60 * 60 * 1000;
export async function logUserIn(reqBody: loginCredentials) {
  const res = await postData<LoginResponse, loginCredentials>(endpoints.auth.signin, reqBody);

  if (res.success) {
    const token = res.data.data.access_token;
    const user = res.data.data;
    const expires = new Date(Date.now() + SESSION_PERIOD);
    cookies().set('session', token, {
      expires,
    });
    cookies().set('user', JSON.stringify(user), {
      expires,
    });
    return res.data;
  }
}
export async function logUserOut() {
  const expires = new Date(0);
  cookies().set('session', '', { expires });
  cookies().set('user', '', { expires });
}
type loginCredentials = {
  username: string;
  password: string;
};
type LoginResponse = {
  message: string;
  data: {
    role: string;
    access_token: string;
    account: string;
    avatar: string;
    email: string;
    email_verified_at: string | null;
    id: string;
    name: string;
    username: string;
    phone: string;
    phone_verified_at: string | null;
  };
  statusCode: number;
};

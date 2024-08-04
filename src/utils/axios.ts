import axios, { AxiosRequestConfig } from 'axios';
import { HOST_API } from 'src/config-global';
import { getCookie } from 'cookies-next';
// ----------------------------------------------------------------------
const STORAGE_KEY = 'access_token';

const axiosInstance = axios.create({
  baseURL: HOST_API,
  /*  headers: {
      Authorization: `Bearer ${getCookie(STORAGE_KEY)}`,
    }, */
});
axiosInstance.interceptors.response.use(
  (response) =>
    // Handle successful responses
    response,
  (error) => {
    //   const router = useRouter();

    //   const { logout, unauthenticated } = useAuthContext();

    // Handle error responses
    if (error.response.status === 401) {
      //   setCookie('access_token', '');
      //     deleteCookie('access_token')
      //  console.log('here',   error.response.status);
      // Redirect to login or handle unauthorized access
      // Example: router.push('/login');
      //    logout();
      console.log(error.message);
      //  router.replace('/');
      console.log('done  Unauthorized access!');
    }
    return '';
  }
);
/* axiosInstance.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${getCookie(STORAGE_KEY)}`;
    return request
  },
  (error) => {

    if (error.response.status === 401) {

      console.log(error.message)

      console.log('done  Unauthorized access!');
    }
    return '';
  }
); */
export default axiosInstance;

// ----------------------------------------------------------------------
export const fetcher = async (
  args: string | [string, AxiosRequestConfig],
  token?: string
): Promise<any> => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const updatedConfig = {
    ...config,
    headers: {
      ...config?.headers, // Keep existing headers if any
      Authorization: `Bearer ${token || getCookie(STORAGE_KEY)}`, // Set the new 'Authorization' header with the token
    },
  };

  const res = await axiosInstance.get(url, updatedConfig);

  return res.data;
};
// ----------------------------------------------------------------------

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    signin: 'auth/signin',
    restPassword: 'auth/request-reset-password',
    register: '/api/auth/register',
  },
};

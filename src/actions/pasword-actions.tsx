'use server';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';

import axiosInstance, { endpoints, getErrorMessage } from 'src/utils/axios';


// eslint-disable-next-line consistent-return
export const restPassword= cache(async (data:any): Promise<any> => {
  const access_token = getCookie('access_token', { cookies });
  const headers = {

    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };

  console.log(data)
  try {
    const res = await axiosInstance.post(`${endpoints.auth.restPassword}`, data, headers);
    console.log("here",res)

  } catch (error) {
    console.log(error);
    return { error: getErrorMessage(error) };
  }
});

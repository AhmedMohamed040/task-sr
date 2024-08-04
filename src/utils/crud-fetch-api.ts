import { cookies } from 'next/headers';

// Define types for successful and error responses
export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message: string;
  status: number;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  status: number;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Define a type for the request options
export type RequestOptions = {
  headers?: Record<string, string>;
  cache?: RequestCache;
};

// Base URL for the API
// const API_BASE_URL = process.env.HOST_API;
const API_BASE_URL = 'https://symlink.live/api/v1/';

// Helper function to get the token from cookies
const getToken = (): string => {
  const cookieStore = cookies();
  return cookieStore.get('session')?.value || '';
};

// Helper function to get the language from cookies or default to 'ar'
const getLanguage = (): string => {
  const cookieStore = cookies();
  return cookieStore.get('lang')?.value || 'ar';
};

// generic function to make API requests
async function apiRequest<TResponse, TBody = undefined>(
  endpoint: string,
  method: string,
  body?: TBody,
  options: RequestOptions = {}
): Promise<ApiResponse<TResponse>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  const lang = getLanguage();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Accept-Language': lang,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: options.cache,
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.message || 'An error occurred',
        status: response.status,
      };
    }

    return {
      success: true,
      data: responseData,
      message: responseData.message || 'Success',
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      status: 500,
    };
  }
}

// CRUD functions
export async function getData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, 'GET', undefined, options);
}

export async function postData<TResponse, TBody>(
  endpoint: string,
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, 'POST', data, options);
}

export async function editData<TResponse, TBody>(
  endpoint: string,
  method: 'PUT' | 'PATCH',
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, method, data, options);
}

export async function deleteData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, 'DELETE', undefined, options);
}

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type FilterParams = Record<string, string | number | boolean | undefined>;

export type QueryParams = PaginationParams & FilterParams;

export function buildQueryString(params: QueryParams): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return query ? `?${query}` : '';
}

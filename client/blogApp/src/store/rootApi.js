import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, ) => {
    // headers.set('Token', process.env.REACT_APP_Token);
    // headers.set('devicetype', DEVICE_TYPE.WEB);
    //     const token = localStorage.getItem('admin_accessToken');
    //     if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const query = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result?.error, 'error');
  
  return result;
};

const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: query,
  tagTypes: [
    // 'TOKENS',

  ],
  endpoints: () => ({}),
});

export default rootApi;
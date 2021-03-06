function getApiUrl() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return process.env.REACT_APP_API_URL;
    case 'production':
      return process.env.REACT_APP_PROD_API_URL;
    case 'test':
      return 'http://test-api-url.com/api';
  }
}

export const apiURL: string = getApiUrl() || 'http://default-url.com/api';

type config = {
  data?: any;
  token?: string | null;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';
  headers?: HeadersInit;
  // if you want all possibility of `fetch`
  customConfig?: RequestInit;
};

/*
  To call the api.

  To `get` an item
  client("item") OR client("item", {method: "GET"}).then(resultJson => ...)
  But it's "GET" by default if no data.

  If you want `POST` an item, you need to provide data.
  If Data was provided, default method is `POST`
  client("item", {data: myObject}).then(resultJson => ...).catch(error => ...)

  To `patch` an item
  client("item/1", {method: "PATCH"}).then(resultJson => ...).catch(error => ...)
  
  To provide a Token :
  client("item/1", {method: "PATCH", token: "MYTOKEN"}).then(resultJson => ..., error => ...)

  Same for post etc...

  You can see exemple in `client.test.tsx`
*/
async function client<T>(
  endpoint: string,
  { data, method, token, headers: customHeaders, customConfig }: config = {},
): Promise<T> {
  const config: RequestInit = {
    method: method || (data ? 'POST' : 'GET'),
    body: data ? JSON.stringify(data) : null,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      Accept: 'application/json',
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    // statusCode "401" is for unauthenticated request
    if (response.status === 401) {
      return Promise.reject({ message: 'Please re-authenticate.' });
    }

    const data = response.status === 204 ? null : await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };

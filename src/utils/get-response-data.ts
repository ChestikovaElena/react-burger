import { CustomResponse, TResponseBody } from '../services/types/data';

export const getResponseData = (res: CustomResponse<TResponseBody>) => {console.log(res);
  return res.ok ?
    res.json()
  : 
    res.json()
      .then((error) => Promise.reject(error));
}
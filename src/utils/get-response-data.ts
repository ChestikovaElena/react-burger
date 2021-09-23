export const getResponseData =
  (res: Response) => {
    return res.ok ?
      res.json()
    : 
      res.json()
        .then((error) => Promise.reject(error));
}
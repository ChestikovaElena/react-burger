export const getResponseData = (res) => {
  return res.ok ?
    res.json()
  : 
    res.json()
      .then((error) => Promise.reject(error));
}
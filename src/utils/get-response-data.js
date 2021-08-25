export const getResponseData = (res) => {
	if (!res.ok) {
		return Promise.reject(res.json());
	}
	return res.json();
}
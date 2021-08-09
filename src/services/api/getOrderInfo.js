const API_SOURCE = 'https://norma.nomoreparties.space/api/orders';

export const getOrderInfoRequest = (arrayOfID) => {
  fetch(API_SOURCE, {
    method: 'POST',
    body: JSON.stringify({"ingredients": arrayOfID}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
                      if (result.ok) {
                        return result.json();
                      } return Promise.reject(`Ошибка ${result.status}`);
                    })
}
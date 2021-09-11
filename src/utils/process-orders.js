import { getDate } from './get-date';
import { WS_UPDATE_ORDER } from '../services/actions/ws';

const saveIngredient = (ingredient, id, count) => {
  const newItem = {
    "id": id,
    "count": count,
    "name": ingredient.name,
    "image": ingredient.image_mobile,
    "price": ingredient.price
  };

  return newItem
}

const getIngredient = (data, id, count, cb) => {
  const soughtArray =  [...data].filter(item => item._id === id);

  return cb(soughtArray[0], id, count);
};

export const processIngredients = (data, ingredients) => {
  const ingredietnsWithCount = (ingredients.reduce((count, ingr) => (
      count[ingr] = (count[ingr] || 0) + 1,
      count
    ), {}
  ));
  const newIngredients = [];
  
  for (const ingr of Object.keys(ingredietnsWithCount)) {
    const newItem = getIngredient(data, ingr, ingredietnsWithCount[ingr], saveIngredient);
    newIngredients.push(newItem);
  }

  return newIngredients;
}

export const processOrders = (data, dispatch, orders) => {
  orders = orders.filter((item, index) => !item.isUpdateOrder);
  
  for (const order of orders) {
    const { ingredients } = order;
    const newIngredients = processIngredients(data, ingredients);
    const date = getDate(order.createdAt);
    const updateOrder = {
      ...order,
      createdAt: date,
      ingredients: newIngredients,
      isUpdateOrder: true
    };
    if (updateOrder && newIngredients.length) {
      dispatch({
        type: WS_UPDATE_ORDER,
        updateOrder
      })
    }
  }
}
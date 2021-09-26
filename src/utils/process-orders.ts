import { getDate } from './get-date';
import { TIngredient, TOrder } from '../services/types/data';

const saveIngredient = (ingredient: TIngredient, id: string, count: number) => {
  
  const newItem = {
    "id": id,
    "count": count,
    "name": ingredient.name,
    "image": ingredient.image_mobile,
    "price": ingredient.price
  };

  return newItem
}

const getIngredient = (data: Array<TIngredient>, id: string, count: number, cb: Function) => {
  const soughtArray =  [...data].filter(item => item._id === id);
  if (soughtArray && soughtArray.length) {
    return cb(soughtArray[0], id, count);
  }
};

export const processIngredients = (data: Array<TIngredient>, ingredients: Array<string>) => {
  type TIngr = {[ingredientID in string]: number};
  let tIngr: TIngr = {};
  
  const ingredietnsWithCount: TIngr = (ingredients.reduce((count, ingredientID) => {
    count[ingredientID] = (count[ingredientID] || 0) + 1;
    return tIngr
  }, tIngr
));

  const newIngredients = [];
  
  for (const ingredientID of Object.keys(ingredietnsWithCount)) {
    
    const newItem = getIngredient(data, ingredientID, ingredietnsWithCount[ingredientID], saveIngredient);
    newIngredients.push(newItem);
  }

  return newIngredients;
}

export const processOrders =
  (data: Array<TIngredient>, orders: Array<TOrder>, updatingState: string) => {
  
  orders = orders.filter((item) => !item.isUpdateOrder);
  
  for (const order of orders) {
    const { ingredients } = order;
    if (ingredients && ingredients.length) {
      const newIngredients = processIngredients(data, ingredients as Array<string>);
      const date = getDate(order.createdAt);
    const updateOrder = {
      ...order,
      createdAt: date,
      ingredients: newIngredients,
      isUpdateOrder: true
    };

    return updateOrder;
    // if (updateOrder && newIngredients.length && updatingState === 'ws') {
    //   dispatch({
    //     type: WS_UPDATE_ORDER,
    //     updateOrder
    //   })
    // } else if ( updateOrder && newIngredients.length && updatingState === 'wsUser' ) {
    //   dispatch({
    //     type: WS_USER_UPDATE_ORDER,
    //     updateOrder
    //   })
    // } else if ( updateOrder && newIngredients.length && updatingState === 'orderInfo' ) {
    //   dispatch({
    //     type: UPDATE_ORDER_INFO,
    //     updateOrder
    //   })
    // }
    };
    
  }
}
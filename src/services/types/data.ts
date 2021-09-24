export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export type TIngredientSelected = TIngredient & {
  customID: string;
}

export type TOrder = {
  _id: string,
  ingredients: string[] | Array<TIngredientInUpdateOrder | null>,
  status: 'created' | 'pending' | 'done',
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number,
  isUpdateOrder?: boolean,
}

export type TIngredientInUpdateOrder = {
  id: string,
  count: number,
  name: string,
  price: number,
  image: string,
}

export type TOrderUpdated = Omit<TOrder, 'ingredients'> & {
  ingredients: Array<TIngredientInUpdateOrder> | Array<string>,
}

export type TOrderInfo = {
  orderNumber: number | null,
  selectedIngredients: Array<string>,
}

export type TOrderFull = {
  ingredients: TIngredient[],
  _id: string,
  owner: TUser & {
    createdAt: string,
    updatedAt: string,
  },
  status: 'created' | 'pending' | 'done',
  name: string,
  createdAt: string,
    updatedAt: string,
  number: number,
  price: number
}

export type TUser = {
  readonly name: string,
  readonly email: string,
}

export type TPayloadUser = {
  readonly password?: string,
  readonly name?: string,
  readonly email?: string,
}

// export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
//   [key in TDataKey]: TDataType
// } & {
//   success: boolean;
// };
export type TResponseBody = {
  success: boolean;
  data?: TIngredient[],
  order?: TOrder[]
};

export interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

export interface CustomResponse<T> extends CustomBody<T> {
  readonly bodyUsed: boolean;
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}
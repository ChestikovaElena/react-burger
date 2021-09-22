export type TIngredient = {
  readonly _id: string,
  readonly name: string,
  readonly type: string,
  readonly proteins: number,
  readonly fat: number,
  readonly carbohydrate: number,
  readonly сalories: number,
  readonly price: number,
  readonly image: string,
  readonly image_mobile: string,
  readonly image_large: string,
  readonly _v: number,
}

export type TIngredientSelected = TIngredient & {
  readonly customID: string;
}

export type TOrder = {
  readonly _id: string,
  readonly ingredients: string[],
  readonly status: 'created' | 'pending' | 'done',
  readonly name: string,
  readonly createdAt: string,
  readonly updatedAt: string,
  readonly number: number,
  readonly isUpdateOrder?: boolean,
}

export type TIngredientInUpdateOrder = {
  readonly id: string,
  readonly count: number,
  readonly name: string,
  readonly price: number,
  readonly image: string,
}

export type TOrderUpdated = Omit<TOrder, 'ingredients'> & {
  readonly ingredients: ReadonlyArray<TIngredientInUpdateOrder> | ReadonlyArray<string>,
  readonly isUpdateOrder: boolean,
}

export type TOrderInfo = {
  orderNumber: number | null,
  selectedIngredients: Array<string>,
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

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
};

interface CustomBody<T extends any> extends Body {
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
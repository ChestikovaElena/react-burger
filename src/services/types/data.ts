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
}

export type TIngredientInUpdateOrder = {
  readonly id: string,
  readonly count: number,
  readonly name: string,
  readonly price: number,
  readonly image: string,
}

export type TOrderUpdated = Omit<TOrder, 'ingredients'> & {
  readonly ingredients: ReadonlyArray<TIngredientInUpdateOrder>,
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
export type TTab = 'bun' | 'sauce' | 'main';
type TTypeOfIngredients = {type: TTab, name: string};

export const typeOfIngredients: TTypeOfIngredients[]= [
  {type: "bun", name: "Булки"},
  {type: "sauce", name: "Соусы"},
  {type: "main", name: "Начинки"},
];
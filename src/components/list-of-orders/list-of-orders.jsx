import Column from '../column';

export const ListOfOrders = () => {
  const array = [
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
    {type: "bun", name: "Булки"},
    {type: "sauce", name: "Соусы"},
    {type: "main", name: "Начинки"},
  ];
  return (
    <Column request={false} requestFailed={false} title="Лента заказов">
      {array.map(
        (item, index) =>
          <li key={`${index}`}>
            <h1>
              {item.type}
            </h1>
            <p>{item.name}</p>
          </li>
      )}
    </Column>
  );
}

export default ListOfOrders;
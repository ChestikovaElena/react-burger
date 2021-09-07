import Column from '../column';
import OrderCard from '../order-card';

export const ListOfOrders = () => {
  let date = new Date();
  date = date.toUTCString();

  const array = [
    {
      id: '2434325464564',
      number: '03898455',
      time: date,
      title: 'Death Star Starship бургер',
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3'
      ],
      cost: 1800
    },
    {
      id: '78566364646',
      number: '03898455',
      time: date,
      title: 'Death Star Starship бургер',
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733d3'
      ],
      cost: 1800
    }
  ];
  return (
    <Column request={false} requestFailed={false} title="Лента заказов" type="right">
      {array.map(
        (item, index) =>
          <li key={`${index}`} className="mb-4">
            <OrderCard orderInfo={item}/>
          </li>
      )}
    </Column>
  );
}

export default ListOfOrders;
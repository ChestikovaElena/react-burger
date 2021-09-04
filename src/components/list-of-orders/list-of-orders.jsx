import Column from '../column';
import OrderCard from '../order-card';

export const ListOfOrders = () => {
  let date = new Date();
  date = date.toUTCString();

  const array = [
    {
      number: '03898455',
      time: date,
      title: 'Death Star Starship бургер',
      ingredients: [
        {
          _id: '60d3b41abdacab0026a733c6',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0,
          customID: '8d4653a4-1162-40d0-8174-432a9f30cecb'
        },
        {
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
          customID: '3ba5dab7-73dc-409a-b3bd-ca0f7899999f'
        },
        {
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
          customID: '76703462-9f98-45d0-9d1f-46be84970da0'
        },
        {
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
          customID: 'baaa9714-fcdc-4b3a-9657-5c533dc5a20c'
        },
        {
          _id: '60d3b41abdacab0026a733ce',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
          __v: 0,
          customID: '9bd53865-a293-4b8e-9a7a-0dfd64abc621'
        },
        {
          _id: '60d3b41abdacab0026a733c9',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
          __v: 0,
          customID: '66d374ef-ce02-49f3-8457-6523ba48f300'
        },
        {
          _id: '60d3b41abdacab0026a733c9',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
          __v: 0,
          customID: '75285110-bd66-49f7-b6ce-18ad20a74079'
        },
        {
          _id: '60d3b41abdacab0026a733cb',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0,
          customID: '838728bb-c354-4b90-8b9b-56e18416a0ea'
        },
        {
          _id: '60d3b41abdacab0026a733ca',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0,
          customID: '4e66073e-66bd-4c9e-a980-5f271d8ad463'
        },
        {
          _id: '60d3b41abdacab0026a733d1',
          name: 'Плоды Фалленианского дерева',
          type: 'main',
          proteins: 20,
          fat: 5,
          carbohydrates: 55,
          calories: 77,
          price: 874,
          image: 'https://code.s3.yandex.net/react/code/sp_1.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
          __v: 0,
          customID: '765fed77-4552-4b3f-8f0f-814a9e3eb72f'
        },
        {
          _id: '60d3b41abdacab0026a733d3',
          name: 'Мини-салат Экзо-Плантаго',
          type: 'main',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 6,
          price: 4400,
          image: 'https://code.s3.yandex.net/react/code/salad.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
          __v: 0,
          customID: '0f444e13-99ad-4075-a311-c3ae8228a62f'
        }
      ],
      cost: 1800
    }
  ];
  return (
    <Column request={false} requestFailed={false} title="Лента заказов">
      {array.map(
        (item, index) =>
          <li key={`${index}`}>
            <OrderCard orderInfo={item}/>
          </li>
      )}
    </Column>
  );
}

export default ListOfOrders;
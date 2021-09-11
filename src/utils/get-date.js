function getTextFormat(number, textForms) {
  number = Math.abs(number) % 100; 
  const n1 = number % 10;
  if (number > 10 && number < 20) { return textForms[2]; }
  if (n1 > 1 && n1 < 5) { return textForms[1]; }
  if (n1 == 1) { return textForms[0]; }
  return textForms[2];
}

export const getDate = (createdAt) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow'
  };
  const dateTime = Date.parse(createdAt);
  const date = new Date(dateTime);
  const currentDate = new Date();
  const day = (currentDate.getUTCDate() - date.getUTCDate()) === 0
    ? 'Сегодня' :
    (currentDate.getUTCDate() - date.getUTCDate()) === 1
      ? 'Вчера' :
      `${currentDate.getUTCDate() - date.getUTCDate()} 
       ${getTextFormat(currentDate.getUTCDate() - date.getUTCDate(), ['день', 'дня', 'дней'])} назад`
    ;
  const hours = date.toLocaleString('ru', options);
  return `${day}, ${hours} i-GMT+3`;
}
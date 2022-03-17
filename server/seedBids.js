const { Bid } = require('./db/models');
const bid = [
  {
    user_id: 5,
    title: 'Хулиганство',
    status: 'неактуально',
    link: 'https://news.store.rambler.ru/img/035a7ae1fb4176e472b69b66b29399d6?img-format=auto&img-1-resize=height:630,fit:max',
    text: 'Разрисованная и замусоренная детская площадка',
  },
  {
    user_id: 6,
    title: 'Протечка трубы дома ',
    status: 'неактуально',
    link: 'https://hearthstoneblog.ru/wp-content/uploads/91fe8076fb0210806b484a1ccc6ddad7.jpg',
    text: 'Протечка а ванной',
  },
  {
    user_id: 6,
    title: 'Перегородили проезд',
    status: 'актуально',
    link: 'https://i.ytimg.com/vi/Dm8f4ew3qtk/maxresdefault.jpg',
    text: 'Не могу выехать из двора.Перегородила черная mazda A233TT 799',
  },
  {
    user_id: 6,
    title: 'Мусор',
    status: 'актуально',
    link: 'https://musorniy.ru/wp-content/uploads/2018/12/275117zf24004d1.jpg',
    text: 'У подьезда 5, куча мусора  ',
  },
];

async function addBid(obj) {
  try {
    await Bid.create({
      status: obj.status,
      user_id: obj.user_id,
      title: obj.title,
      text: obj.text,
    });
  } catch (err) {
    console.log(err);
  }
}
// bid.map((el) => addBid(el));

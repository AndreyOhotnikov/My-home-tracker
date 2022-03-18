const {
  User,
  City,
  Street,
  Home,
  Userinfo,
  Benifit,
  Bid,
  Chat,
  Global_news,
  Instruction,
  Like,
  Local_news,
  Photolink,
  Response,
  Store,
  Support,
  Category_store,
  Category_benifit,
} = require('./db/models');

const city = [{ name: 'Москва' }, { name: 'Ступино' }, { name: 'Саратов' }, { name: 'Обнинск' }];
async function addCity(obj) {
  try {
    await City.create({
      name: obj.name,
    });
  } catch (err) {
    console.log(err);
  }
}

// city.map((el) => addCity(el));

const street = [
  { name: 'Ленина', city_id: 1 },
  { name: 'Труда', city_id: 1 },
  { name: 'Никольская', city_id: 1 },
  { name: 'Моховая', city_id: 1 },
  { name: 'Тверская', city_id: 1 },
  { name: 'Андропова', city_id: 2 },
  { name: 'Восточная', city_id: 2 },
  { name: 'Дачная', city_id: 2 },
  { name: 'Берёзовая', city_id: 2 },
  { name: 'Гоголя', city_id: 2 },
  { name: 'Кирова', city_id: 3 },
  { name: 'Астраханская', city_id: 3 },
  { name: 'Железнодорожная', city_id: 3 },
  { name: 'Рабочая', city_id: 3 },
  { name: 'Кузнечная', city_id: 3 },
  { name: 'Ленина', city_id: 4 },
  { name: 'Курчатова', city_id: 4 },
  { name: 'Гагарина', city_id: 4 },
  { name: 'Маркса', city_id: 4 },
  { name: 'Калужская', city_id: 4 },
];

async function addStreet(obj) {
  try {
    await Street.create({
      name: obj.name,
      city_id: obj.city_id,
    });
  } catch (err) {
    console.log(err);
  }
}

// street.map((el) => addStreet(el));

const home = [
  { name: 31, street_id: 1 },
  { name: 123, street_id: 1 },
  { name: 1, street_id: 2 },
  { name: 145, street_id: 2 },
  { name: 3, street_id: 3 },
  { name: 56, street_id: 3 },
  { name: 56, street_id: 4 },
  { name: 43, street_id: 4 },
  { name: 45, street_id: 5 },
  { name: 25, street_id: 5 },
  { name: 48, street_id: 6 },
  { name: 12, street_id: 6 },
  { name: 56, street_id: 7 },
  { name: 14, street_id: 7 },
  { name: 10, street_id: 8 },
  { name: 12, street_id: 8 },
  { name: 23, street_id: 9 },
  { name: 21, street_id: 9 },
  { name: 2, street_id: 10 },
  { name: 35, street_id: 10 },
  { name: 43, street_id: 11 },
  { name: 42, street_id: 11 },
  { name: 32, street_id: 12 },
  { name: 9, street_id: 12 },
  { name: 4, street_id: 13 },
  { name: 56, street_id: 13 },
  { name: 3, street_id: 14 },
  { name: 32, street_id: 14 },
  { name: 43, street_id: 15 },
  { name: 56, street_id: 15 },
  { name: 32, street_id: 16 },
  { name: 3, street_id: 16 },
  { name: 34, street_id: 17 },
  { name: 32, street_id: 17 },
  { name: 32, street_id: 18 },
  { name: 12, street_id: 18 },
  { name: 13, street_id: 19 },
  { name: 8, street_id: 19 },
  { name: 32, street_id: 20 },
  { name: 2, street_id: 20 },
];
async function addHome(obj) {
  try {
    await Home.create({
      name: obj.name,
      street_id: obj.street_id,
    });
  } catch (err) {
    console.log(err);
  }
}

// home.map((el) => addHome(el));

const user = [
  {
    nick_name: 'bob',
    email: '123@md.ru',
    role: 'chairman',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'bib',
    email: '123md.ru',
    role: 'chairman',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'lol',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 2,
  },
  {
    nick_name: 'hob',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 3,
  },
  {
    nick_name: 'lob',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'mob',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'ob',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'mike',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'lina',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'german',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'lola',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'kerem',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'marfa',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'mia',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'liza',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 2,
  },
  {
    nick_name: 'mila',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'rom',
    email: '123md.ru',
    role: 'user',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
];
async function addUser(obj) {
  try {
    await User.create({
      nick_name: obj.nick_name,
      email: obj.email,
      role: obj.role,
      checked: obj.checked,
      password: obj.password,
      home_id: obj.home_id,
    });
  } catch (err) {
    console.log(err);
  }
}
// user.map((el) => {
//   addUser(el);
// });

// const chat = [
//   { user_id: 1, text: 'blabla' },
//   { user_id: 2, text: 'some words' },
// ];
// async function addChat(obj) {
//   try {
//     await Chat.create({
//       text: obj.text,
//       user_id: obj.user_id,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
// chat.map((el) => addChat(el));

// const instruction = [
//   { user_id: 1, text: 'Памятка для собственников помещений многоквартирных домов.Памятка для собственников помещений многоквартирных домов, проводящих общее собрание по вопросу изменения способа формирования фонда капитального ремонта МКД. В соответствии с пунктом 1.1 части 2 статьи 44, частью 1 статьи 173 Жилищного кодекса Российской Федерации общее собрание собственников помещений в многоквартирном доме вправе принять решение  об изменении способа формирования фонда капитального ремонта  многоквартирного дома в любое время.Порядок принятия решения и оформления его результатов установлен статьями 44-48 Жилищного кодекса Российской Федерации.Согласно части 4 статьи 173 Жилищного кодекса Российской Федерации решение общего собрания собственников помещений в многоквартирном доме об изменении способа формирования фонда капитального ремонта в течение пяти рабочих дней после принятия такого решения направляется владельцу специального счета, на который перечисляются взносы на капитальный ремонт общего имущества в таком многоквартирном доме, или региональному оператору, на счет которого перечисляются эти взносы. В силу части 5 статьи 173 Жилищного кодекса Российской Федерации решение о прекращении формирования фонда капитального ремонта на счете регионального оператора и формировании фонда капитального ремонта на специальном счете вступает в силу через два года после направления региональному оператору решения общего собрания собственников помещений в многоквартирном доме в соответствии с частью 4 настоящей статьи, если меньший срок не установлен законом субъекта Российской Федерации. В течение пяти дней после вступления в силу указанного решения региональный оператор перечисляет средства фонда капитального ремонта на специальный счет.Решение о прекращении формирования фонда капитального ремонта на специальном счете и формировании фонда капитального ремонта на счете регионального оператора вступает в силу через один месяц после направления владельцу специального счета решения общего собрания собственников помещений в многоквартирном доме в соответствии с частью 4 настоящей статьи, но не ранее наступления условия, указанного в части 2 настоящей статьи. В течение пяти дней после вступления в силу указанного решения владелец специального счета перечисляет средства фонда капитального ремонта на счет регионального оператора (Часть 6 статьи 173 Жилищного кодекса Российской Федерации)', title: 'Памятка для собственников помещений многоквартирных домов' },
//   { user_id: 2, text: 'second instruction', title: 'second' },
// ];
// async function addInstruction(obj) {
//   try {
//     await Instruction.create({
//       text: obj.text,
//       user_id: obj.user_id,
//       title: obj.title,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
// instruction.map((el) => addInstruction(el));

// const support = [
//   { user_id: 1, text: 'first support' },
//   { user_id: 2, text: 'second support' },
// ];
// async function addSupport(obj) {
//   try {
//     await Support.create({
//       text: obj.text,
//       user_id: obj.user_id,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
// support.map((el) => addSupport(el));

const userinfo = [
  {
    user_id: 1,
    full_name: 'Иванов Иван Иванович',
    link: 1,
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 2,
    full_name: 'Иванов Вадим Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 3,
    full_name: 'Серов Иван Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 4,
    full_name: 'Попов Иван Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 5,
    full_name: 'Иванова Вера Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 6,
    full_name: 'Иванова Лиза Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 7,
    full_name: 'Семенов Иван Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 8,
    full_name: 'Новак Иван Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 9,
    full_name: 'Гун Иван Иванович',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 10,
    full_name: 'Че Иван Иванович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553534,
  },
  {
    user_id: 11,
    full_name: 'Соловьев Иван Иванович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553534,
  },
  {
    user_id: 12,
    full_name: 'Седов Иван Иванович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553534,
  },
  {
    user_id: 13,
    full_name: 'Петров Пётр Петрович',
    adress: 'П 4 кв 200',
    link: 'https://st.depositphotos.com/2413271/5050/i/600/depositphotos_50503825-stock-photo-handsome-man-taking-selfie.jpg',
    phone: 88005553535,
  },
  {
    user_id: 14,
    full_name: 'Петрова Ирина Петровна',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
  {
    user_id: 15,
    full_name: 'Гоман Анна Петровна',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
  {
    user_id: 16,
    full_name: 'Петров Света Петровна',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
  {
    user_id: 17,
    full_name: 'Петров Роман Петрович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
];

async function addUserinfo(obj) {
  try {
    await Userinfo.create({
      link: obj.link,
      full_name: obj.full_name,
      user_id: obj.user_id,

      adress: obj.adress,
      phone: obj.phone,
    });
  } catch (err) {
    console.log(err);
  }
}
// userinfo.map((el) => addUserinfo(el));

const store = [
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 2,
    category_id: 1,
    title: 'кровать',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 1,
    category_id: 1,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
];

async function addStore(obj) {
  try {
    await Store.create({
      category_id: obj.category_id,
      status: obj.status,
      user_id: obj.user_id,
      title: obj.title,
      text: obj.text,
      price: obj.price,
    });
  } catch (err) {
    console.log(err);
  }
}

// store.map((el) => addStore(el));

const local_news = [
  {
    user_id: 1,
    title: 'Осторожно, сосульки !!',
    status: '',
    text: 'Сегодня обратил внимание, что УК невовремя убирает снег с крыши,будьте аккуратнее',

  },
  {
    user_id: 2,
    title: 'Благодарность',
    status: '',
    text: 'Хочу поблагодарить жильца 2 подъезда Петрова А.А. за помощь устранении неполдадки со стиральной машиной',

  },
  {
    user_id: 3,
    title: 'Подозрительные личности',
    status: '',
    text: 'Дорогие жильцы нашего дома , сегодня столкнулся с подозрительными личностями,которые в течение 20 минут копали землю около детской площадки.Будьте аккуратнее',

  },
  {
    user_id: 4,
    title: 'Работа УК ТСЖ',
    status: '',
    text: 'Хотелось бы выразить благодарность управляещему по нашему дому Петрову Б.Б. за своевременное реагирования на просьбы жильцов',

  },

];
async function addLocal_news(obj) {
  try {
    await Local_news.create({
      status: obj.status,
      user_id: obj.user_id,
      title: obj.title,
      text: obj.text,
      phone: obj.phone,
    });
  } catch (err) {
    console.log(err);
  }
}

// local_news.map((el) => addLocal_news(el));

const global_news = [
  {
    user_id: 1,
    title: 'Собрание жильцов 3 подъезда',
    status: 'актуально',
    text: 'Уважаемые жильцы 21 марта 2022 года с 09:00 до 10:00, в целях проведения работ по технологическому присоединению в вашем многоквартирном доме силами ОСП "НГЭС" МУП "Коммунальные сети ", будет введено ограничение режима потребления электроэнергии.',
  },
  {
    user_id: 2,
    title: 'Собственники помещений рискуют заплатить за мусор своих арендаторов',
    status: 'актуально',
    text: 'Региональный оператор по обращению с ТКО  напоминает, что все потребители, имеющие в собственности объект жилой или нежилой недвижимости обязаны оплачивать услугу по обращению с ТКО. Арендатор сам оплачивает услугу, только если заключил договор с региональным оператором напрямую. Во всех остальных случаях счет должен оплачивать собственник помещения.Если собственник помещения ссылается на прямой договор между арендатором и регоператором, но договор не был заключен, то регоператор вынужден будет взыскать имеющийся долг с собственника помещения.',
    fixed: 'false',
  },
  {
    user_id: 1,
    title: 'Силами управляющей компании устранен провал грунта у жилого дома',
    status: 'актуально',
    text: 'После проведенных МУП "Водоканал" работ осенью прошлого года на проезжей части придомовой территории  образовался провал размером 2*3 м и глубиной до 50 см. Жильцы  дома стали жаловаться на неудобства, а некоторые автомобилисты даже получили небольшие повреждения кузова при попадании в яму. Силами Управляющей компании  с использованием техники и противоусадочных материалов провал был ликвидирован.',
    fixed: 'false',
  },
  {
    user_id: 2,
    title: 'Собственники помещений рискуют заплатить за мусор своих арендаторов',
    status: 'актуально',
    text: 'Региональный оператор по обращению с ТКО  напоминает, что все потребители, имеющие в собственности объект жилой или нежилой недвижимости обязаны оплачивать услугу по обращению с ТКО. Арендатор сам оплачивает услугу, только если заключил договор с региональным оператором напрямую. Во всех остальных случаях счет должен оплачивать собственник помещения.Если собственник помещения ссылается на прямой договор между арендатором и регоператором, но договор не был заключен, то регоператор вынужден будет взыскать имеющийся долг с собственника помещения.',
    fixed: 'false',
  },
  {
    user_id: 2,
    title: 'Уборочные работы с наступлением теплых дней идут полным ходом ',
    status: 'актуально',
    text: 'Быстрая весенняя карусель стремительно обнажила все "прелести" городских пейзажей. Однако, не все обитатели городских джунглей успеют насладиться мусорными развалами в окрестностях своих домов. Бдительные стражи этих богатых залежей в лице коммунальщиков Управляющей компании "ЖКХ" оперативно пресекают все нежелательные контакты жителей с городскими мусорными "подснежниками". Чистым улицам и дворам в городе БЫТЬ! ',
    fixed: 'false',
  },
];
async function addGlobal_news(obj) {
  try {
    await Global_news.create({
      status: obj.status,
      user_id: obj.user_id,
      title: obj.title,
      text: obj.text,
      fixed: obj.fixed,
    });
  } catch (err) {
    console.log(err);
  }
}
// global_news.map((el) => addGlobal_news(el));

// const response = [
//   {
//     user_id: 2,
//     global_news_id: 1,
//     status: 'true',
//   },
//   {
//     user_id: 1,
//     local_news_id: 2,
//     status: 'true',
//   },
// ];
// async function addResponce(obj) {
//   try {
//     await Response.create({
//       local_news_id: obj.local_news_id,
//       user_id: obj.user_id,
//       global_news_id: obj.global_news_id,
//       status: obj.status,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
// response.map((el) => addResponce(el));

// const like = [
//   {
//     user_id: 1,
//     global_news_id: 1,
//     count: 20,
//   },
//   {
//     user_id: 1,
//     local_news_id: 2,
//     count: 30,
//   },
// ];
// async function addLike(obj) {
//   try {
//     await Like.create({
//       local_news_id: obj.local_news_id,
//       user_id: obj.user_id,
//       global_news_id: obj.global_news_id,
//       count: obj.count,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// like.map((el) => addLike(el));

const photolink = [
  {
    global_news_id: 2, link: 'https://gkhirkutsk.ru/news/10062021/WhatsApp%20Image%202021-06-10%20at%2013.57.35.jpeg',
  },
  {
    global_news_id: 3, link: 'https://opt-1390303.ssl.1c-bitrix-cdn.ru/images/%D0%9D%D0%9E%D0%92%D0%9E%D0%A1%D0%A2%D0%98/%D0%9E%D0%91%D0%A9%D0%95%D0%95/WhatsApp%20Image%202021-03-19%20at%2008.18.37.jpeg',
  },
  {
    global_news_id: 1, link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3-8lfKPSXrJfQ9HuPr4dFAMRZT7flgNqlP_uSWQZU9-M8sW1mhBp1GSNn6UHGVziPzzo&usqp=CAU',
  },
  {
    global_news_id: 4, link: 'https://opt-1390303.ssl.1c-bitrix-cdn.ru/images/%D0%9D%D0%9E%D0%92%D0%9E%D0%A1%D0%A2%D0%98/%D0%9E%D0%91%D0%A9%D0%95%D0%95/WhatsApp%20Image%202021-03-31%20at%2020.41.21%20(9).jpeg',
  },
  {
    global_news_id: 5, link: 'https://gkhirkutsk.ru/news/10062021/WhatsApp%20Image%202021-06-10%20at%2013.57.35.jpeg',
  },
  {
    local_news_id: 1, link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIFyMFS7ZsFF72MNvOwYZVEEIUKQ8ZhDvcvg&usqp=CAU',
  },
  {
    local_news_id: 2, link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0iYiQe1N1GbsOyJ5BwsOdXERmVC7VOSf5w&usqp=CAU',
  },
  {
    local_news_id: 3, link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY6v6uCtuyr4t3DXd5197b5bLmFdLsas5lHA&usqp=CAU',
  },
  {
    local_news_id: 4, link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBzPNECQdXPkz5XaVv5sFPP6mWz-f-fhIa9A&usqp=CAU',
  },
];
async function addPhotolink(obj) {
  try {
    await Photolink.create({
      local_news_id: obj.local_news_id,
      userinfo_id: obj.user_id,
      global_news_id: obj.global_news_id,
      bid_id: obj.bid_id,
      link: obj.link,
    });
  } catch (err) {
    console.log(err);
  }
}

// photolink.map((el) => addPhotolink(el));

const category_store = [
  {
    title: 'Без категории',
    link: 'http://localhost:3000/...',
  },
  {
    title: 'Мебель',
    link: 'http://localhost:3000/...',
  },
  {
    title: 'Игрушки',
    link: 'http://localhost:3000/...',
  },
  {
    title: 'Техника',
    link: 'http://localhost:3000/...',
  },
  {
    title: 'Одежда',
    link: 'http://localhost:3000/...',
  },
  {
    title: 'Прочее',
    link: 'http://localhost:3000/...',
  },
];
async function addCategory_store(obj) {
  try {
    await Category_store.create({
      title: obj.title,
      link: obj.link,
    });
  } catch (err) {
    console.log(err);
  }
}

// category_store.map((el) => addCategory_store(el));

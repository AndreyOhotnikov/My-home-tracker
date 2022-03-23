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

const city = [{ name: 'Москва' }, { name: 'Воронеж' }];
async function addCity(obj) {
  try {
    await City.create({
      name: obj.name,
    });
  } catch (err) {
    console.log(err);
  }
}

city.map((el) => addCity(el));

const street = [
  { name: 'Труда', city_id: 1 },
  { name: 'Победы', city_id: 1 },
  { name: 'Ленина', city_id: 2 },
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

street.map((el) => addStreet(el));

const home = [
  { name: 31, street_id: 1 },
  { name: 31, street_id: 2 },
  { name: 32, street_id: 1 },
  { name: 123, street_id: 3 },
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

home.map((el) => addHome(el));

const user = [
  {
    nick_name: 'bob',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'bib',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'lol',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'hob',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'lob',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'mob',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'ob',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'mike',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'lina',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'german',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'lola',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'kerem',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'marfa',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'mia',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'liza',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 2,
  },
  {
    nick_name: 'mila',
    email: '123',
    role: 'admin',
    checked: 'true',
    password: '123',
    home_id: 1,
  },
  {
    nick_name: 'rom',
    email: '123',
    role: 'admin',
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

const chat = [
  { user_id: 1, text: 'blabla' },
  { user_id: 2, text: 'some words' },
];
async function addChat(obj) {
  try {
    await Chat.create({
      text: obj.text,
      user_id: obj.user_id,
    });
  } catch (err) {
    console.log(err);
  }
}
// chat.map((el) => addChat(el));

const instruction = [
  { user_id: 1, text: 'Памятка для собственников помещений многоквартирных домов.Памятка для собственников помещений многоквартирных домов, проводящих общее собрание по вопросу изменения способа формирования фонда капитального ремонта МКД. В соответствии с пунктом 1.1 части 2 статьи 44, частью 1 статьи 173 Жилищного кодекса Российской Федерации общее собрание собственников помещений в многоквартирном доме вправе принять решение  об изменении способа формирования фонда капитального ремонта  многоквартирного дома в любое время.Порядок принятия решения и оформления его результатов установлен статьями 44-48 Жилищного кодекса Российской Федерации.Согласно части 4 статьи 173 Жилищного кодекса Российской Федерации решение общего собрания собственников помещений в многоквартирном доме об изменении способа формирования фонда капитального ремонта в течение пяти рабочих дней после принятия такого решения направляется владельцу специального счета, на который перечисляются взносы на капитальный ремонт общего имущества в таком многоквартирном доме, или региональному оператору, на счет которого перечисляются эти взносы. В силу части 5 статьи 173 Жилищного кодекса Российской Федерации решение о прекращении формирования фонда капитального ремонта на счете регионального оператора и формировании фонда капитального ремонта на специальном счете вступает в силу через два года после направления региональному оператору решения общего собрания собственников помещений в многоквартирном доме в соответствии с частью 4 настоящей статьи, если меньший срок не установлен законом субъекта Российской Федерации. В течение пяти дней после вступления в силу указанного решения региональный оператор перечисляет средства фонда капитального ремонта на специальный счет.Решение о прекращении формирования фонда капитального ремонта на специальном счете и формировании фонда капитального ремонта на счете регионального оператора вступает в силу через один месяц после направления владельцу специального счета решения общего собрания собственников помещений в многоквартирном доме в соответствии с частью 4 настоящей статьи, но не ранее наступления условия, указанного в части 2 настоящей статьи. В течение пяти дней после вступления в силу указанного решения владелец специального счета перечисляет средства фонда капитального ремонта на счет регионального оператора (Часть 6 статьи 173 Жилищного кодекса Российской Федерации)', title: 'Памятка для собственников помещений многоквартирных домов' },
  { user_id: 2, text: 'second instruction', title: 'second' },
];
async function addInstruction(obj) {
  try {
    await Instruction.create({
      text: obj.text,
      user_id: obj.user_id,
      title: obj.title,
    });
  } catch (err) {
    console.log(err);
  }
}
// instruction.map((el) => addInstruction(el));

const support = [
  { user_id: 1, text: 'first support' },
  { user_id: 2, text: 'second support' },
];
async function addSupport(obj) {
  try {
    await Support.create({
      text: obj.text,
      user_id: obj.user_id,
    });
  } catch (err) {
    console.log(err);
  }
}
// support.map((el) => addSupport(el));

const userinfo = [
  {
    user_id: 18,
    full_name: 'Иванов Иван Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 19,
    full_name: 'Иванов Вадим Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 20,
    full_name: 'Серов Иван Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 21,
    full_name: 'Попов Иван Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 22,
    full_name: 'Иванова Вера Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 23,
    full_name: 'Иванова Лиза Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 23,
    full_name: 'Семенов Иван Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 25,
    full_name: 'Новак Иван Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 26,
    full_name: 'Гун Иван Иванович',
    adress: 'П 4 кв 200',
    phone: 88005553534,
  },
  {
    user_id: 27,
    full_name: 'Че Иван Иванович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553534,
  },
  {
    user_id: 28,
    full_name: 'Соловьев Иван Иванович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553534,
  },
  {
    user_id: 29,
    full_name: 'Седов Иван Иванович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553534,
  },
  {
    user_id: 30,
    full_name: 'Петров Пётр Петрович',
    adress: 'П 4 кв 200',
    link: 'https://st.depositphotos.com/2413271/5050/i/600/depositphotos_50503825-stock-photo-handsome-man-taking-selfie.jpg',
    phone: 88005553535,
  },
  {
    user_id: 31,
    full_name: 'Петрова Ирина Петровна',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
  {
    user_id: 32,
    full_name: 'Гоман Анна Петровна',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
  {
    user_id: 33,
    full_name: 'Петров Света Петровна',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
  {
    user_id: 34,
    full_name: 'Петров Роман Петрович',
    adress: 'П 4 кв 200',
    link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
    phone: 88005553535,
  },
];

async function addUserinfo(obj) {
  try {
    await Userinfo.create({
      full_name: obj.full_name,
      user_id: obj.user_id,
      link: obj.link,
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
    user_id: 5,
    title: 'холодильник',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
  {
    user_id: 6,
    title: 'кровать',
    status: 'актуально',
    text: 'store_text',
    price: 300,
  },
];

async function addStore(obj) {
  try {
    await Store.create({
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
    title: 'локальная новость 1',
    status: 'актуально',
    text: 'local_text',
    phone: 88005553535,
  },
  {
    user_id: 2,
    title: 'локальная новость 2',
    status: 'актуально',
    text: 'local_text',
    phone: 88005553535,
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
    title: 'глобальная новость 1',
    status: 'актуально',
    text: 'пдщифд_text',
    phone: 880055,
  },
  {
    user_id: 2,
    title: 'локальная новость 2',
    status: 'актуально',
    text: 'local_text',
    fixed: 'true',
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

const response = [
  {
    user_id: 2,
    global_news_id: 1,
    status: 'true',
  },
  {
    user_id: 1,
    local_news_id: 2,
    status: 'true',
  },
];
async function addResponce(obj) {
  try {
    await Response.create({
      local_news_id: obj.local_news_id,
      user_id: obj.user_id,
      global_news_id: obj.global_news_id,
      status: obj.status,
    });
  } catch (err) {
    console.log(err);
  }
}
// response.map((el) => addResponce(el));

const like = [
  {
    user_id: 2,
    global_news_id: 1,
    count: 20,
  },
  {
    user_id: 1,
    local_news_id: 2,
    count: 30,
  },
];
async function addLike(obj) {
  try {
    await Like.create({
      local_news_id: obj.local_news_id,
      user_id: obj.user_id,
      global_news_id: obj.global_news_id,
      count: obj.count,
    });
  } catch (err) {
    console.log(err);
  }
}

// like.map((el) => addLike(el));

const photolink = [
  {
    userinfo_id: 1, link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
  },
  {
    userinfo_id: 1, link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
  },
  {
    userinfo_id: 4, link: 'https://media.istockphoto.com/photos/close-up-young-smiling-man-in-casual-clothes-posing-isolated-on-blue-picture-id1270987867?k=20&m=1270987867&s=612x612&w=0&h=lX9Y1qUxtWOa0W0Mc-SvNta00UH0-sgJQItkxfwE4uU=',
  },
  {
    userinfo_id: 5, link: 'https://st.depositphotos.com/2413271/5050/i/600/depositphotos_50503825-stock-photo-handsome-man-taking-selfie.jpg',
  },
  {
    userinfo_id: 6, link: 'https://m.hi-tech.ua/wp-content/uploads/2017/06/selfie-1.jpg',
  },
  {
    userinfo_id: 1, link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
  },
  {
    userinfo_id: 1, link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
  },
  {
    userinfo_id: 2, link: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
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

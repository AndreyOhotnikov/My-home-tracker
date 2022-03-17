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
} = require("./db/models");

const city = [{ name: "Moscow" }, { name: "London" }];
async function addCity(obj) {
  try {
    await City.create({
      name: obj.name,
    });
  } catch (err) {
    console.log(err);
  }
}

//city.map((el) => addCity(el));
const street = [
  { name: "Lenina", city_id: 1 },
  { name: "Traphalgar", city_id: 2 },
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

//street.map((el) => addStreet(el));


const home = [
  { name: 31, street_id: 1 },
  { name: 123, street_id: 2 },
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

//home.map((el) => addHome(el));


const user = [
  {
    nick_name: "bob",
    email: "123",
    role: "admin",
    checked: "true",
    password: "123",
    home_id: 1,
  },
  {
    nick_name: "liza",
    email: "123",
    role: "admin",
    checked: "true",
    password: "123",
    home_id: 2,
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
  { user_id: 1, text: "blabla" },
  { user_id: 2, text: "some words" },
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
//chat.map((el) => addChat(el));
const instruction = [
  { user_id: 1, text: "first instruction", title: "first" },
  { user_id: 2, text: "second instruction", title: "second" },
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
//instruction.map((el) => addInstruction(el));

const support = [
  { user_id: 1, text: "first support" },
  { user_id: 2, text: "second support" },
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
//support.map((el) => addSupport(el));

const benifit = [
  {
    user_id: 1,
    text: "first benifit",
    title: "first",
    price: 100000,
  },
  {
    user_id: 2,
    text: "second benifit",
    title: "second",
    price: 1000,
  },
];
async function addBenifit(obj) {
  try {
    await Benifit.create({
      text: obj.text,
      user_id: obj.user_id,
      title: obj.title,
      price: obj.price,
    });
  } catch (err) {
    console.log(err);
  }
}
//benifit.map((el) => addBenifit(el));

const userinfo = [
  {
    user_id: 1,
    full_name: "Иванов Иван Иванович",
    entrance: 3,
    flat: 100,
    phone: 88005553534,
  },
  {
    user_id: 2,
    full_name: "Петров Пётр Петрович",
    entrance: 1,
    flat: 42,
    phone: 88005553535,
  },
];

async function addUserinfo(obj) {
  try {
    await Userinfo.create({
      full_name: obj.full_name,
      user_id: obj.user_id,
      entrance: obj.entrance,
      flat: obj.flat,
      phone: obj.phone,
    });
  } catch (err) {
    console.log(err);
  }
}
// userinfo.map((el) => addUserinfo(el));


const bid = [{

  user_id: 1, title: 'няня', status: 'актуально', text: 'bid_text',
}, {
  user_id: 1, title: 'Посидеть с собакой', status: 'неактуально', text: 'bid_text',
}, {
  user_id: 5, title: 'Хулиганство', status: 'актуально', text: 'Разрисованная и замусоренная детская площадка',
}, {
  user_id: 6, title: 'Нужен электрик', status: 'неактуально', text: 'Не работает выключатель в комнате',

}];

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
//bid.map((el) => addBid(el));


const store = [
  {
    user_id: 1,
    title: "холодильник",
    status: "актуально",
    text: "store_text",
    price: 300,
  },
  {
    user_id: 1,
    title: "кровать",
    status: "актуально",
    text: "store_text",
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

//store.map((el) => addStore(el));

const local_news = [
  {
    user_id: 1,
    title: "локальная новость 1",
    status: "актуально",
    text: "local_text",
    phone: 88005553535,
  },
  {
    user_id: 2,
    title: "локальная новость 2",
    status: "актуально",
    text: "local_text",
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

//local_news.map((el) => addLocal_news(el));


const global_news = [
  {
    user_id: 1,
    title: "глобальная новость 1",
    status: "актуально",
    text: "пдщифд_text",
    phone: 880055,
  },
  {
    user_id: 2,
    title: "локальная новость 2",
    status: "актуально",
    text: "local_text",
    fixed: "true",
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
//global_news.map((el) => addGlobal_news(el));

const response = [
  {
    user_id: 2,
    global_news_id: 1,
    status: "true",
  },
  {
    user_id: 1,
    local_news_id: 2,
    status: "true",
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
  // {
  //   userinfo_id: 5, link: 'https://www.bigstockphoto.com/images/homepage/collections2020/module-4.jpg',
  // },
  // {
  //   userinfo_id: 6, link: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
  // },
  {
    bid_id: 34, link: 'https://www.remontexpress.ru/upload/iblock/0c7/cover.jpg',
  },
  {
    bid_id: 41, link: 'https://news.store.rambler.ru/img/035a7ae1fb4176e472b69b66b29399d6?img-1-resize=width%3A1280%2Cheight%3A960%2Cfit%3Acover&img-format=auto',

//like.map((el) => addLike(el));


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


//photolink.map((el) => addPhotolink(el));


const category_store = [
  {
    title: "Без категории",
    link: "http://localhost:3000/...",
  },
  {
    title: "Мебель",
    link: "http://localhost:3000/...",
  },
  {
    title: "Игрушки",
    link: "http://localhost:3000/...",
  },
  {
    title: "Техника",
    link: "http://localhost:3000/...",
  },
  {
    title: "Одежда",
    link: "http://localhost:3000/...",
  },
  {
    title: "Прочее",
    link: "http://localhost:3000/...",
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

//category_store.map((el) => addCategory_store(el));


const category_benifit = [
  {
    title: "Няня",
    link: "http://localhost:3000/...",
  },
  {
    title: "Репетитор",
    link: "http://localhost:3000/...",
  },
];
async function addCategory_benifit(obj) {
  try {
    await Category_benifit.create({
      title: obj.title,
      link: obj.link,
    });
  } catch (err) {
    console.log(err);
  }
}
// category_benifit.map((el) => addCategory_benifit(el));

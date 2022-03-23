const { Category_store } = require("./db/models");

const categoryBaraholka=[
  {
    title: 'Без категории',
    link: 'https://www.jde.ru/img/article/podgotovka-knig-k-perevozke_02.jpg'
  },
  {
    title: 'Мебель',
    link: 'https://mebelpokarmanu.com/upload/iblock/70e/70eb15673ef49e573fddcdd0d54356de.jpg'
  },
  {
    title: 'Игрушки',
    link: 'https://klike.net/uploads/posts/2020-04/1585896248_2.jpg'
  },
  {
    title: 'Техника',
    link: 'http://e-finland.ru/media/cache/46/5d/465d120b249bc15fe4c1513086509d38.jpg'
  },
  {

    title: 'Одежда',
    link: 'https://st.depositphotos.com/1177973/3041/i/600/depositphotos_30413835-stock-photo-beautiful-girl-with-lots-clothes.jpg'
  },
  // {

  //   title: 'Прочее',
  //   link: 'https://st2.depositphotos.com/1258191/11997/i/600/depositphotos_119973774-stock-photo-desktop-with-piles-of-paperwork.jpg'
  // },
]


async function addCategoryBarah(obj) {
  await Category_store.create({
    title: obj.title,
    link: obj.link,
  })
}

categoryBaraholka.map((el) => {
  addCategoryBarah(el)
});

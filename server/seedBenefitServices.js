const { Benifit, Category_benifit } = require('./db/models')


const services = [
  {
    user_id: 5,
    title: 'Выгул собак',
    text: 'Могу прогуляться с вашей собакой с пн-пт в любое время',
    price: 500,
    category_id:1,
  },
  {
    user_id: 6,
    title: 'Клининг',
    text: 'Занимаюсь уборкой квартир',
    price: 1000,
    category_id:4,
  },
  {
    user_id: 5,
    title: 'Ремонт,бытовые услуги',
    text: 'Починю ваши трубы, устраню протечки',
    price: 800,
    category_id:2,
  },
  {
    user_id: 6,
    title: 'Репетитор по математике',
    text: 'Подготовлю вашего ребенка к экзамену в школе',
    price: 800,
    category_id:3,
  },
  {
    user_id: 6,
    title: 'Няня',
    text: 'Квалифицированный воспитатель,стаж 10 лет ',
    price: 1000,
    category_id:3,
  },

];

async function addBenifitServices(obj) {
  await Benifit.create({
    text: obj.text,
    user_id: obj.user_id,
    title: obj.title,
    price: obj.price,
    category_id:obj.category_id,
  })
}




services.map((services) => {
  addBenifitServices(services)
})


const category = [
  {
    title: 'Выгул собак',
    link: 'https://i.timeout.ru/pix/resize/503/994/750x485.jpeg'
  },
  {
    title: 'Клининг',
    link: 'https://art-losk.ru/images/ceni-klininga.jpg'
  },
  {
    title: 'Ремонт,бытовые услуги',
    link: 'https://kolomna.muz-doma.ru/data/content/gallery/1096140205b66f96b563d9.jpg'
  },
  {
    title: 'Няня,сиделка,образование',
    link: 'https://www.mostimportant.ru/picts/blog/tn1000x1500-njanja-dlja-rebenka-cena-voprosa-1.jpg'
  },
  {

    title: 'Красота',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/1362253/pub_5beec0738d3c9f00ab0aabde_5beec1808d3c9f00ab0aabed/scale_1200'
  },
]
async function addBenefitCategory(obj) {
  await Category_benifit.create({
    title: obj.title,
    link: obj.link,
  })
}

// category.map((el) => {
//   addBenefitCategory(el)
// });

const {Todo} = require('./db/models/index')


async function addBenefitServices (obj) {
  await Todo.create({name: obj.name, status:obj.status})
}

const category=[
  {
    id:1,
    title:'Выгул собак',
    photo:'https://i.timeout.ru/pix/resize/503/994/750x485.jpeg'
  },
  {
    id:2,
    title:'Клининг',
    photo:'https://art-losk.ru/images/ceni-klininga.jpg'
  },
  {
    id:3,
    title:'Ремонт,бытовые услуги',
    photo:'https://kolomna.muz-doma.ru/data/content/gallery/1096140205b66f96b563d9.jpg'
  },
  {
    id:4,
    title:'Няня,сиделка,образование',
    photo:'https://www.mostimportant.ru/picts/blog/tn1000x1500-njanja-dlja-rebenka-cena-voprosa-1.jpg'
  },
  {
    id:1,
    title:'Красота',
    photo:'https://avatars.mds.yandex.net/get-zen_doc/1362253/pub_5beec0738d3c9f00ab0aabde_5beec1808d3c9f00ab0aabed/scale_1200'
  },

]
const services = [
  {id:1,
  title: 'Выгул собак',
  text:'Могу прогуляться с вашей собакой с пн-пт в любое время',
  price: 500
  },
  {id:2,
    title: 'Клининг',
    text:'Занимаюсь уборкой квартир',
    price: 1000
    },
    {id:3,
      title: 'Ремонт,бытовые услуги',
      text:'Починю ваши трубы, устраню протечки',
      price: 800
      },
      {id:4,
        title: 'Репетитор по математике',
        text:'Подготовлю вашего ребенка к экзамену в школе',
        price: 800
        },
        {id:5,
          title: 'Няня',
          text:'Квалифицированный воспитатель,стаж 10 лет ',
          price: 1000
          },



];


// todos.map((todos) => {
//   addTodo(todos)
// })
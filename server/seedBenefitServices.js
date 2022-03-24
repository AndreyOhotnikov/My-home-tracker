const { Benifit, Category_benifit } = require('./db/models');



const category = [
  {
    title: 'Выгул собак',
    link: 'https://i.timeout.ru/pix/resize/503/994/750x485.jpeg',
  },
  {
    title: 'Клининг',
    link: 'https://art-losk.ru/images/ceni-klininga.jpg',
  },
  {
    title: 'Ремонт,бытовые услуги',
    link: 'https://kolomna.muz-doma.ru/data/content/gallery/1096140205b66f96b563d9.jpg',
  },
  {
    title: 'Няня,сиделка,образование',
    link: 'https://www.mostimportant.ru/picts/blog/tn1000x1500-njanja-dlja-rebenka-cena-voprosa-1.jpg',
  },
  {

    title: 'Красота',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/1362253/pub_5beec0738d3c9f00ab0aabde_5beec1808d3c9f00ab0aabed/scale_1200',
  },
];
async function addBenefitCategory(obj) {
  await Category_benifit.create({
    title: obj.title,
    link: obj.link,
  });
}

category.map((el) => {
  addBenefitCategory(el)
});

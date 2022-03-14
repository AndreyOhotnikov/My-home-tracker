const { Benifit, Category_benifit, User, Userinfo, Photolink } = require('../db/models');


exports.getAllServices = async (req, res) => {
  console.log('services');
  let categor;
  let user;

  categor = await Category_benifit.findAll({ raw: true })
  

  const benefitAndCategory = await Promise.all(await categor.map(async (category) => {
    const serv = await Benifit.findAll({ where: { category_id: category.id }, include: [{ model: User, attributes: ['id', 'nick_name', 'email'], include: [{ model: Userinfo, attributes: ['phone', 'full_name'], include: [{ model: Photolink, attributes: ['userinfo_id', 'link'] }] }] }], raw: true })
    category.benifits = serv
    return category
  }))
  // console.log(benefitAndCategory, 'benefitAndCategory');
  res.json(benefitAndCategory)
}

exports.addNewServices = async (req, res) => {
  console.log('iiiiiiiiiiii');
  console.log(req.body, 'kjhgfdsdfg');
  const { title, text, price, service } = req.body;
  console.log('req.body 7: ', req.body);

  const categId = (id) => {
    switch (service) {
      case 'clining':
        return  4;
      case 'dogWalking':
        return  1;
      case 'repair':
        return 2;
      case 'nanny':
        return  3;
      case 'beauty':
        return  5;
      default:
        break;
    }
  }
const resCategId = categId();
// console.log(resCategId,'resCategId');

  let newService;
  try {
    const newService = await Benifit.create({
      title,
      text,
      price,
      category_id: resCategId
    })

    console.log(newService);
  } catch (error) {
    console.log(error);
  }
  res.json(newService)
}

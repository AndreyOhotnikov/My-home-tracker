const { Benifit, Category_benifit, User, Userinfo, Photolink } = require('../db/models');


exports.getAllServices = async (req, res) => {
  let categor;

  categor = await Category_benifit.findAll({ raw: true })

  const benefitAndCategory = await Promise.all(await categor.map(async (category) => {
    const serv = await Benifit.findAll({ where: { category_id: category.id }, include: [{ model: User, attributes: ['id', 'nick_name', 'email'], include: [{ model: Userinfo, attributes: ['phone', 'full_name'], include: [{ model: Photolink, attributes: ['userinfo_id', 'link'] }] }] }], raw: true })
    category.benifits = serv
    return category
  }))
  res.json(benefitAndCategory)
}

exports.addNewServices = async (req, res) => {
  const { title, text, price, service } = req.body;


  const categId = (id) => {
    switch (service) {
      case 'clining':
        return 4;
      case 'dogWalking':
        return 1;
      case 'repair':
        return 2;
      case 'nanny':
        return 3;
      case 'beauty':
        return 5;
      default:
        break;
    }
  }
  const resCategId = categId();
  
  let newService;
  try {
    const newService = await Benifit.create({
      title,
      text,
      price,
      category_id: resCategId
    })
  } catch (error) {
    console.log(error);
  }
  res.json(newService)
}

exports.deleteServise = async (req, res) => {
  const { id } = req.params;
  await Benifit.destroy({where:{id}});
  res.status(200).end();
};

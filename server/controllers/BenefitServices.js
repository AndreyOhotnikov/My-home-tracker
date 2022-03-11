const { Benifit, Category_benifit } = require('../db/models')

exports.getAllServices = async (req, res) => {
  console.log('services');
  const categories = await Category_benifit.findAll({ raw: true })
  console.log(categories, 'categories');
  let benefitAndCategory = await Promise.all(await categories.map(async (category) => {
    console.log('1111');
    const serv = await Benifit.findAll({ where: { category_id: category.id }, raw: true })
    category.benifits = serv
    return category
  }))
  console.log(benefitAndCategory, 'benefitAndCategory');
  res.json(benefitAndCategory)
}


// exports.getAllServices = async (req, res) => {
//   console.log('lkkj');
//   console.log('services');
//   const services = await Benifit.findAll({ include: { model: Category_benifit, attributes: ['title','link']} , raw: true })
//   console.log(services, 'services');
//   res.json(services)
// }



// exports.getAllServices = async (req, res) => {
//   console.log('lkkj');
//   console.log('services');
//   const category = await Category_benifit.findAll({ include: { model: Benifit, attributes: ['id','title','text','price']} , raw: true })
//   console.log(category, 'category');
//   res.json(category)
// }

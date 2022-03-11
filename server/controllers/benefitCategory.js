const { Category_benifit } = require('../db/models');

// exports.getAllCategory = async (req, res) => {
//   console.log('category');
//   const categories = await Category_benifit.findAll({ raw: true })
//   console.log(categories, 'categories');
//   res.json(categories)
// }

// exports.findCategory = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const oneCategoryById = await Category_benifit.findOne({ where: { id }, raw: true });
//     res.json(oneCategoryById)
//   } catch (error) {
//     console.log('Err', error.message);
//   }
// };

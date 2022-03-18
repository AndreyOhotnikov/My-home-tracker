const sequelize = require('sequelize');
const { Global_news, Like, Photolink } = require('../db/models');

exports.createGlobalNews = async (req, res) => {
  const findNews = await Global_news.findOne({ where: { id: req.body?.idNews } });
  if (!findNews) {
    const newGlobal = await Global_news.create({
      title: req.body.title, text: req.body.text, fixed: req.body.check, user_id: req.session.user.id,
    });
    const global = await Photolink.create({ global_news_id: newGlobal.id, link: req.body.link });
    newGlobal.dataValues.link = global.link;

    res.json(newGlobal.dataValues);
  } else if (findNews) {
    const newGlobal = await Global_news.update({ title: req.body.title, text: req.body.text, fixed: req.body.check }, { where: { id: req.body.idNews } });
    const global = await Photolink.update({ global_news_id: newGlobal.id, link: req.body.link });
    newGlobal.dataValues.link = global.link;
    res.json(newGlobal.dataValues);
  }
};

exports.getAllGlobalNews = async (req, res) => {
  try {
    const allNews = await Global_news.findAll({ include: [{ model: Like }, { model: Photolink }], raw: true });
    const arr = allNews.map((el) => {
      el.likeLength = el['Likes.user_id']?.length;
      el.link = el['Photolinks.link'];
      return el;
    });
    console.log(arr);
    arr.sort((a, b) => (b.id - a.id));
    res.json(arr);
  } catch (err) {
    console.log(err);
  }
};

exports.addLike = async (req, res) => {
  console.log(req.params.id);
  try {
    const findCurrentLike = await Like.findOne({ where: { global_news_id: Number(req.params.id) }, raw: true }); // user_id: req.session.user.id
    if (findCurrentLike) {
      if (findCurrentLike.user_id) {
        const filterArr = findCurrentLike.user_id.filter((el) => el !== req.session.user.id);
        console.log(findCurrentLike, 'findCurrentLike');
        console.log(filterArr, 'createLike');
        if (findCurrentLike.user_id?.length === filterArr.length) {
          const createLike = await Like.update({ user_id: [...findCurrentLike.user_id, req.session.user.id] }, {
            where: { global_news_id: Number(req.params.id) },
          });
          res.json({ status: true, id: Number(req.params.id) });
        } else if (findCurrentLike.user_id?.length !== filterArr.length) {
          const createLike = await Like.update({ user_id: [...filterArr] }, {
            where: { global_news_id: Number(req.params.id) },
          });
          res.json({ status: false, id: Number(req.params.id) });
        }
      }
    } else if (!findCurrentLike) {
      const createLike = await Like.create({ user_id: [Number(req.session.user.id)], global_news_id: Number(req.params.id) }, {
        where: { global_news_id: Number(req.params.id) },
      });
      res.json({ status: true, id: Number(req.params.id) });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.delGlobalNews = (async (req, res) => {
  try {
    await Photolink.destroy({ where: { global_news_id: Number(req.params.id) } });
    await Like.destroy({ where: { global_news_id: Number(req.params.id) } }),
    await Global_news.destroy({ where: { id: Number(req.params.id) } }),
    res.json(Number(req.params.id));
  } catch (err) {
    console.log(err);
  }
});

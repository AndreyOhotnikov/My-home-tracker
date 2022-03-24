const { Local_news, LikeLocal, Photolink } = require('../db/models');

exports.createLocalNews = async (req, res) => {
  const findNews = await Local_news.findOne({ where: { id: req.body?.idNews }, raw: true });
  if (!findNews) {
    const newLocal = await Local_news.create({
      title: req.body.title, text: req.body.text, user_id: req.session.user.id,
    });
    const local = await Photolink.create({ local_news_id: newLocal.id, link: req.body.link });
    newLocal.dataValues.link = local.link;

    res.json(newLocal.dataValues);
  } else if (findNews) {
    await Local_news.update({ title: req.body.title, text: req.body.text }, { where: { id: req.body.idNews } });
    await Photolink.update({ link: req.body.link }, { where: { local_news_id: req.body.idNews } });
    const findLink = await Photolink.findOne({ where: { local_news_id: req.body.idNews }, raw: true });
    findNews.link = findLink.link;
    res.json(findNews);
  }
};

exports.getAllLocalNews = async (req, res) => {
  try {
    const allNews = await Local_news.findAll({ include: [{ model: LikeLocal }, { model: Photolink }], raw: true });
    const arr = allNews.map((el) => {
      el.likeLength = el['LikeLocal.user_id']?.length;
      el.link = el['Photolinks.link'];
      return el;
    });
    arr.sort((a, b) => (b.id - a.id));
    res.json(arr);
  } catch (err) {
    console.log(err);
  }
};

exports.addLocalLike = async (req, res) => {
  try {
    const findCurrentLike = await LikeLocal.findOne({ where: { local_news_id: Number(req.params.id) }, raw: true });
    if (findCurrentLike) {
      if (findCurrentLike.user_id) {
        const filterArr = findCurrentLike.user_id.filter((el) => el !== req.session.user.id);
        if (findCurrentLike.user_id?.length === filterArr.length) {
          const createLike = await LikeLocal.update({ user_id: [...findCurrentLike.user_id, req.session.user.id] }, {
            where: { local_news_id: Number(req.params.id) },
          });
          res.json({ status: true, id: Number(req.params.id) });
        } else if (findCurrentLike.user_id?.length !== filterArr.length) {
          const createLike = await LikeLocal.update({ user_id: [...filterArr] }, {
            where: { local_news_id: Number(req.params.id) },
          });
          res.json({ status: false, id: Number(req.params.id) });
        }
      }
    } else if (!findCurrentLike) {
      const createLike = await LikeLocal.create({ user_id: [Number(req.session.user.id)], local_news_id: Number(req.params.id) }, {
        where: { local_news_id: Number(req.params.id) },
      });
      res.json({ status: true, id: Number(req.params.id) });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.delLocalNews = (async (req, res) => {
  try {
    await Photolink.destroy({ where: { local_news_id: Number(req.params.id) } });
    await LikeLocal.destroy({ where: { local_news_id: Number(req.params.id) } }),
    await Local_news.destroy({ where: { id: Number(req.params.id) } }),
    res.json(Number(req.params.id));
  } catch (err) {
    console.log(err);
  }
});

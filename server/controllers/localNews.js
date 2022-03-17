const { Local_news, LikeLocal, Photolink } = require('../db/models');

exports.createLocalNews = async (req, res) => {
  // console.log(req.body, 'eeeeeeeeeeeee');
  const findNews = await Local_news.findOne({ where: { id: req.body?.idNews } });
  if (!findNews) {
    const newLocal = await Local_news.create({
      title: req.body.title, text: req.body.text, user_id: req.session.user.id,
    });
    const local = await Photolink.create({ local_news_id: newLocal.id, link: req.body.link });
    newLocal.dataValues.link = local.link;

    res.json(newLocal.dataValues);
  } else if (findNews) {
    const newLocal = await Local_news.update({ title: req.body.title, text: req.body.text, }, { where: { id: req.body.idNews } });
    const local = await Photolink.update({ global_news_id: newLocal.id, link: req.body.link });
    newLocal.dataValues.link = local.link;
    res.json(newLocal.dataValues);
  }
};

exports.getAllLocalNews = async (req, res) => {
  try {
    const allNews = await Local_news.findAll({ include: [{ model: LikeLocal }, { model: Photolink }], raw: true });
    // console.log(allNews);
    const arr = allNews.map((el) => {
      el.likeLength = el['LikeLocal.user_id']?.length;
      el.link = el['Photolinks.link'];
      return el;
    });
    // console.log(allNews);
    res.json(arr);
    // await Global_news.destroy({
    //   where: { status: null },
    // });
  } catch (err) {
    console.log(err);
  }
};

exports.addLocalLike = async (req, res) => {
  console.log(req.params.id);
  try {
    const findCurrentLike = await LikeLocal.findOne({ where: { local_news_id: Number(req.params.id) }, raw: true }); // user_id: req.session.user.id
    // console.log(findCurrentLike.user_id, '37');
    if (findCurrentLike) {
      if (findCurrentLike.user_id) {
        const filterArr = findCurrentLike.user_id.filter((el) => el !== req.session.user.id);
        console.log(findCurrentLike, 'findCurrentLike');
        console.log(filterArr, 'createLike');
        if (findCurrentLike.user_id?.length === filterArr.length) {
          const createLike = await LikeLocal.update({ user_id: [...findCurrentLike.user_id, req.session.user.id] }, {
            where: { local_news_id: Number(req.params.id) },
          });
          console.log(findCurrentLike.user_id?.length);
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
      console.log(Number(req.params.id));
      res.json({ status: true, id: Number(req.params.id) });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.delLocalNews = (async (req, res) => {
  try {
    console.log(req.params);
    await Photolink.destroy({ where: { local_news_id: Number(req.params.id) } });
    await LikeLocal.destroy({ where: { local_news_id: Number(req.params.id) } }),
    await Local_news.destroy({ where: { id: Number(req.params.id) } }),

    res.json(Number(req.params.id));
  } catch (err) {
    console.log(err);
  }
});

const { Global_news, Like } = require('../db/models');

exports.createGlobalNews = async (req, res) => {
  console.log(req.body);
  const findNews = await Global_news.findOne({ where: { id: req.body?.idNews } });
  if (!findNews) {
    await Global_news.create({
      title: req.body.title, text: req.body.text, fixed: req.body.check,
    });
    res.json(true);
  } else if (findNews) {
    console.log(1234);
    await Global_news.update({ title: req.body.title, text: req.body.text, fixed: req.body.check }, { where: { id: req.body.idNews } });
    res.json(true);
  }
};

exports.getAllGlobalNews = async (req, res) => {
  try {
    const allNews = await Global_news.findAll({ include: { model: Like }, raw: true });
    console.log(allNews);
    const arr = allNews.map((el) => {
      el.likeLength = el['Likes.user_id']?.length;
      return el;
    });
    console.log(allNews);
    res.json(arr);
    // await Global_news.destroy({
    //   where: { status: null },
    // });
  } catch (err) {
    console.log(err);
  }
};

exports.addLike = async (req, res) => {
  const user = 4;
  // console.log(Number(req.params.id));
  try {
    const findCurrentLike = await Like.findOne({ where: { global_news_id: Number(req.params.id) }, raw: true }); // user_id: req.session.user.id
    // console.log(findCurrentLike.user_id, '37');
    if (findCurrentLike) {
      if (findCurrentLike.user_id) {
        const filterArr = findCurrentLike.user_id.filter((el) => el !== user);
        console.log(findCurrentLike, 'findCurrentLike');
        console.log(filterArr, 'createLike');
        if (findCurrentLike.user_id?.length === filterArr.length) {
          const createLike = await Like.update({ user_id: [...findCurrentLike.user_id, user] }, {
            where: { global_news_id: Number(req.params.id) },
          });
          console.log(findCurrentLike.user_id?.length);
          res.json({ status: true, id: req.params.id });
        } else if (findCurrentLike.user_id?.length !== filterArr.length) {
          const createLike = await Like.update({ user_id: [...filterArr] }, {
            where: { global_news_id: Number(req.params.id) },
          });
          res.json({ status: false, id: req.params.id });
        }
      }
    } else if (!findCurrentLike) {
      const createLike = await Like.create({ user_id: [user], global_news_id: req.params.id }, {
        where: { global_news_id: Number(req.params.id) },
      });
      res.json({ status: true, id: req.params.id });
    }
  } catch (err) {
    console.log(err);
  }
};

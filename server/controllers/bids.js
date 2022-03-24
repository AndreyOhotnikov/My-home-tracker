const {
  Bid, Userinfo, User, Photolink,
} = require('../db/models');

exports.getAllBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({
      include: [{
        model: User,
        attributes: ['id', 'nick_name', 'email'],
        include: [{ model: Userinfo, attributes: ['phone', 'id', 'full_name', 'adress', 'link'], include: [{ model: Photolink, attributes: ['bid_id', 'userinfo_id', 'id', 'link'] }] }],
      }],
      raw: true,
    });

    res.json(bids);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Userinfo,
      attributes: ['full_name', 'adress', 'phone','link'],
      include: [{ model: Photolink, attributes: ['link'] }],
    }],
    raw: true,
  });


  res.json(users);
};


exports.addNewBid = async (req, res) => {
  const {
    title, text, price, status, url,
  } = req.body.bids;
  const statusInDb = () => {
    switch (status) {
      case 'actualno':
        return 'актуально';
      case 'neactualno':
        return 'неактуально';
      default:
        break;
    }
  };
  const resStatusInDb = statusInDb();

  let newBid;
  let user;
  let bidPhoto;
  try {
    newBid = await Bid.create({
      title,
      text,
      price,
      status: resStatusInDb,
      user_id: req.session.user.id,
      link: req.body.url
    });
    bidPhoto = await Photolink.create({ bid_id: newBid.id, link: req.body.url });

  } catch (error) {
    console.log(error);
  }
  res.json({ newBid, bidPhoto, user });
};

exports.deleteBid = async (req, res) => {
  const { id } = req.params;
  await Bid.destroy({ where: { id } });
  res.status(200).end();
};

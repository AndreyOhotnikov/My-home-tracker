const {
  Bid, Userinfo, User, Photolink,
} = require('../db/models');

exports.getAllBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({
      include: [{
        model: User,
        attributes: ['id', 'nick_name', 'email'],
        include: [{ model: Userinfo, attributes: ['phone', 'id', 'full_name', 'entrance', 'flat'], include: [{ model: Photolink, attributes: ['bid_id', 'userinfo_id', 'id', 'link'] }] }],
      }],
      raw: true,
    });

    console.log(bids, 'bbbbbbbb');

    res.json(bids);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Userinfo,
      attributes: ['full_name', 'adress', 'phone'],
      include: [{ model: Photolink, attributes: ['link'] }],
    }],
    raw: true,
  });

  console.log(users, 'bbbbbbbb');

  res.json(users);
};

// exports.getAllBids = async (req, res) => {
//   let bid;
//   bid = await Bid.findAll({ raw: true });
//   const bidAndUserAndPhoto = await Promise.all(await bid.map(async (el) => {
//     const userinfo = await User.findAll({ include: [{where:bid_id:bid include: [{ model: Userinfo, attributes: ['phone', 'full_name', 'entrance', 'flat'], include: [{ model: Photolink, attributes: ['bid_id', 'userinfo_id', 'id', 'link'] }] }] }], raw: true });
//     el.userinfo = userinfo;
//     console.log(bidAndUserAndPhoto,'bidAndUserAndPhoto');
//     return el;
//   }));
//   res.json(bidAndUserAndPhoto);
// };

exports.addNewBid = async (req, res) => {
  const {
    title, text, price, status, url,
  } = req.body.bids;
  console.log(req.body.url, 'req.body');
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
    });
    bidPhoto = await Photolink.create({ bid_id: newBid.id, link: req.body.url });

    console.log(newBid, 'newBid');
    console.log(bidPhoto, 'bidPhoto');
  } catch (error) {
    console.log(error);
  }
  res.json({ newBid, bidPhoto, user });
};

exports.deleteBid = async (req, res) => {
  console.log('lllll');
  const { id } = req.params;
  await Bid.destroy({ where: { id } });
  res.status(200).end();
};

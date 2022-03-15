const {
  Bid, Userinfo, User, Photolink,
} = require('../db/models');

exports.getAllBids = async (req, res) => {
  const bids = await Bid.findAll({ include: [{ model: User, attributes: ['id', 'nick_name', 'email'], include: [{ model: Userinfo, attributes: ['phone', 'full_name'], include: [{ model: Photolink, attributes: ['userinfo_id', 'link'] }] }] }], raw: true });
  res.json(bids);
};

exports.addNewBid = async (req, res) => {
  const {
    title, text, price, status,
  } = req.body;
  console.log(req.body, 'req.body');
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
  try {
    const newBid = await Bid.create({
      title,
      text,
      price,
      status: resStatusInDb,
      user_id: req.session.user.id,
    });

    console.log(newBid, 'newBid');
  } catch (error) {
    console.log(error);
  }
  res.json({ newBid, user });
};

const express = require('express');

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const {
  User, City, Street, Home, Userinfo, Benifit, Bid, Chat, Global_news, Instruction, Like, Local_news, Photolink, Response, Store, Support,
} = require('../db/models');

exports.checkUserAndCreateSession = async (req, res, next) => {
  console.log(req.body);
  const { name, pass } = req.body;
  let user;
  try {
    user = await User.findOne({ where: { nick_name: name }, raw: true });
    console.log(2342342);
    if (!user) return res.json({ error: 'Неправильное имя!' });
    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword) return res.json({ error: 'Неправильное имя или пароль' });
    if (user && isValidPassword) {
      req.session.user = { id: user.id, name: user.nick_name, role: user.role };
      res.json({ user: user.nick_name, role: user.role, home_id: user.home_id });
    }
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
  }
};

exports.checkAuth = async (req, res) => {
  let user;
  // console.log(234234)
  if (req.session.user) {
    try {
      user = await User.findOne({ where: { id: req.session.user.id }, raw: true });
    } catch (error) {

    }
    res.json({
      user: {
        user_id: user.id, user: user.nick_name, role: user.role, home_id: user.home_id,
      },
      //   config: {
      //   apiKey: process.env.apiKey,
      //   authDomain: process.env.authDomain,
      //   projectId: process.env.projectId,
      //   storageBucket: process.env.storageBucket,
      //   messagingSenderId: process.env.messagingSenderId,
      //   appId: process.env.appId
      // }
    });
  } else {
    res.json({
      error: false,
      //   config: {
      //   apiKey: process.env.apiKey,
      //   authDomain: process.env.authDomain,
      //   projectId: process.env.projectId,
      //   storageBucket: process.env.storageBucket,
      //   messagingSenderId: process.env.messagingSenderId,
      //   appId: process.env.appId
      // }
    });
  }
};

exports.createUserAndSession = async (req, res, next) => {
  console.log(req.body);
  const {
    name, email, pass, isChairman, city, street, home, home_id, street_id, city_id, idHome,
  } = req.body;
  try {
    let user; let newHome; let newStreet; let newCity; let findCity; let findStreet; let
      findHome;
    const checkUser = await User.findOne({ where: { [Op.or]: [{ nick_name: name }, { email }] } });
    if (!checkUser) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass, saltRounds);
      if (idHome && name && email && pass) { // если указан конкретный id дома создаем простого пользователя
        user = await User.create({
          nick_name: name, email, role: 'user', checked: 'false', password: hashedPassword, home_id: idHome,
        });
      } else if (home_id && street_id && city_id && name && email && pass) {
        user = await User.create({
          nick_name: name, email, role: 'user', checked: 'false', password: hashedPassword, home_id,
        });
      } else if (isChairman && city_id && street_id) {
        newHome = await Home.create({ name: home, street_id });
        user = await User.create({
          nick_name: name, email, role: 'chairman', checked: 'false', password: hashedPassword, home_id: newHome.id,
        });
      } else if (isChairman && city_id) {
        newStreet = await Street.create({ name: street, city_id });
        newHome = await Home.create({ name: home, street_id: newStreet.id });
        user = await User.create({
          nick_name: name, email, role: 'chairman', checked: 'false', password: hashedPassword, home_id: newHome.id,
        });
      } else if (isChairman) {
        console.log('-----------------------------------46');

        newCity = await City.create({ name: city });
        newStreet = await Street.create({ name: street, city_id: newCity.id });
        newHome = await Home.create({ name: home, street_id: newStreet.id });
        user = await User.create({
          nick_name: name, email, role: 'chairman', checked: 'false', password: pass, home_id: newHome.id,
        });
      } else {
        console.log('У вас нет прав');
        res.json({ error: 'У вас нет прав' });
      }
      req.session.user = { id: user.id, name: user.nick_name, role: user.role };
      res.json({ user: user.nick_name, role: user.role, home_id: user.home_id });
    } else {
      res.json({ error: 'пользователь зарегестрирован' });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.destroySession = (req, res, next) => { // Уничтоженеи сессии
  console.log('destroySession-', req.session.user);

  req.session.destroy((err) => {
    console.log('Удаление сессии');
    if (err) return next(err);
    res.clearCookie('sid');
    res.json(false);
    console.log(req?.session?.user);
  });
};

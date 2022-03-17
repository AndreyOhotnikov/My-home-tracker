const express = require('express');

const {
  User, City, Street, Home, Userinfo, Benifit, Bid, Chat, Global_news, Instruction, Like, Local_news, Photolink, Response, Store, Support,
} = require('../db/models');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const { create } = require('hbs');


exports.checkUserAndCreateSession = async (req, res, next) => {
  console.log(req.body)
  const { name, pass } = req.body;
  let user;
  try {
    user = await User.findOne({ where: { nick_name: name }, raw: true });
    console.log(2342342)
    if (!user) return res.json({error: 'Неправильное имя!'});
    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword) return res.json({error: 'Неправильное имя или пароль'});
    else if (user && isValidPassword) {
      req.session.user = {id: user.id, name: user.nick_name, role: user.role};
      res.json({user: user.nick_name, role: user.role, home_id: user.home_id })
    }
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
  }

}

exports.userInfoEdit = async (req, res, next) => {
  console.log(req.body)
  const { fullName, phone, photo, adress, urlPhoto } = req.body;
  let user, userInfo, usenInfoFind, linkFind, link, userInfoFind2, linkFind2
  try {
    user = await User.findOne({ where: { id: req.session.user.id }, raw: true });
    usenInfoFind = await Userinfo.findOne({where: {user_id: user.id}})
    if (usenInfoFind) linkFind = await Photolink.findOne({where: {userinfo_id: user.id}})

    if (usenInfoFind) {
      userInfo = await Userinfo.update({
      full_name: fullName,  
      phone: phone, 
      adress: adress,
      }, { where: {user_id: user.id} }, { returning: true, plain: true });
    } else {
      userInfo = Userinfo.create({full_name: fullName,  
        phone: phone, 
        adress: adress, user_id: user.id})
    }
    userInfoFind2 = await Userinfo.findOne({where: {user_id: user.id}, raw: true})
    
    if (linkFind) {
        link = await Photolink.update({
          link: urlPhoto || linkFind.link,  
          }, { where: {userinfo_id: user.id} }, { returning: true, plain: true });
    } else {
      link = await Photolink.create({link: urlPhoto,  
        userinfo_id: user.id})
    }
    linkFind2 = await Photolink.findOne({where: {userinfo_id: user.id}, raw: true})
  
  
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
  }

  res.json({userInfoFind2, linkFind2})
}

exports.destroySession = (req, res, next) => { // Уничтоженеи сессии
  console.log('destroySession-', req.session.user)

  req.session.destroy((err) => {
    console.log('Удаление сессии')
    if (err) return next(err);
    res.clearCookie('sid');
    res.json(false);
    console.log(req?.session?.user)

  });
}




exports.checkAuth = async (req, res) => {
  let user, userInfo, photo, bid, benefits, store
  // console.log(234234)
  if(req.session.user) {
    try {
      user = await User.findOne({where: {id: req.session.user.id}, raw: true})
      userInfo = await Userinfo.findOne({where: {user_id: user.id}, raw: true})
      photo = await Photolink.findOne({where: {userinfo_id: user.id}, raw: true})
      bid = await Bid.findAll({limit: 4, where: {user_id: user.id}/*, include: [{model: Photolink, attributes: ['link']}]*/, raw: true})
      benefits = await Benifit.findAll({limit: 4, where: {user_id: user.id}/*, include: [{model: Photolink, attributes: ['link']}]*/, raw: true})
      store = await Store.findAll({limit: 4, where: {user_id: user.id}/*, include: [{model: Photolink, attributes: ['link']}]*/, raw: true})
      console.log(store)
      
      res.json({
        user: {user_id: user.id, user: user.nick_name, role: user.role, home_id: user.home_id }, 
        userInfo, 
        photo,
        bid,
        benefits,
        store,
        email: user.email
      })

    } catch (error) {
      res.json({error: false})
      // req.session.destroy((err) => {
      //   console.log('Удаление сессии')
      //   if (err) return next(err);
      //   res.clearCookie('myHome');
      //   res.json(false);
      //   console.log(req?.session?.user)
        
      // });
    }
  }
}


exports.createUserAndSession = async (req, res, next) => {
  console.log(req.body)
  const {name, email, pass, isChairman, city, street, home, home_id, street_id, city_id, idHome, photoIsChairman} = req.body
  try {
    let user, newHome, newStreet, newCity, findCity, findStreet, findHome, document
    const checkUser = await User.findOne({where: {[Op.or]: [{ nick_name: name }, { email: email }]}})
    if (!checkUser) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass, saltRounds);
      if (idHome && name && email && pass) { //если указан конкретный id дома создаем простого пользователя
        user = await User.create({nick_name: name, email: email, role: 'user', checked: 'false', password: hashedPassword, home_id: idHome})
      } 
      else if (home_id && street_id && city_id && name && email && pass) {
        user = await User.create({nick_name: name, email: email, role: 'user', checked: 'false', password: hashedPassword, home_id})
      } 
      else if (isChairman && city_id && street_id) {
        newHome = await Home.create({ name: home, street_id})
        user = await User.create({nick_name: name, email: email, role: 'chairman', checked: 'false', password: hashedPassword, home_id: newHome.id})
        document = await Promise.all(await photoIsChairman.map(async photo => await Photolink.create({link: photo, documentIsChairman_user_id: user.id})))
      } 
      else if (isChairman && city_id) {

        newStreet = await Street.create({ name: street, city_id })
        newHome = await Home.create({ name: home, street_id: newStreet.id})
        user = await User.create({nick_name: name, email: email, role: 'chairman', checked: 'false', password: hashedPassword, home_id: newHome.id})
        document = await Promise.all(await photoIsChairman.map(async photo => await Photolink.create({link: photo, documentIsChairman_user_id: user.id})))
      } 
      else if (isChairman ) {
        // console.log('-----------------------------------46')
        newCity = await City.create({ name: city })
        newStreet = await Street.create({ name: street, city_id: newCity.id })
        newHome = await Home.create({ name: home, street_id: newStreet.id})
        user = await User.create({nick_name: name, email: email, role: 'chairman', checked: 'false', password: pass, home_id: newHome.id})
        document = await Promise.all(await photoIsChairman.map(async photo => await Photolink.create({link: photo, documentIsChairman_user_id: user.id})))
      } else {
        console.log('У вас нет прав')
        res.json({error: 'У вас нет прав' })
      }
      req.session.user = {id: user.id, name: user.nick_name, role: user.role};
      res.json({user: user.nick_name, role: user.role, home_id: user.home_id })
    } else {
      res.json({error: 'пользователь зарегестрирован' })
    }
  } catch (error) {
    console.log(error)
  }
}



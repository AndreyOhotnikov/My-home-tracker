const express = require('express');
const router = express.Router();
const {
  User, City, Street, Home, Userinfo, Benifit, Bid, Chat, Global_news, Instruction, Like, Local_news, Photolink, Response, Store, Support,
} = require('../db/models');


exports.getAllLocations = async (req, res, next) => {
  try {
    let cityes = await City.findAll({order:[['id', 'DESC']], raw:true}) //массив городов
    console.log('cityes', cityes)
    let cityesAndSrteetsAndHomes = await Promise.all(await cityes.map( async (city) => {
      const streets = await Street.findAll({where: {city_id: city.id}, raw:true})
      console.log('streets', streets)
      const streetsAndHomes = await Promise.all(await streets.map(async (street) => {
        console.log(1111)
        const homes = await Home.findAll({where: {street_id: street.id}, raw:true})
        console.log('homes', homes)

        street.homes = homes;
        return street;
      }))
      city.streets = streetsAndHomes;
      return city;
    }))
    res.json({location: cityesAndSrteetsAndHomes})
  } catch (error) {
    console.error(error);
  }
}

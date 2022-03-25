const express = require('express');

const router = express.Router();
const {
  User, City, Street, Home, Userinfo, Benifit, Bid, Chat, Global_news, Instruction, Like, Local_news, Photolink, Response, Store, Support,
} = require('../db/models');

exports.getAllLocations = async (req, res, next) => {
  try {
    const cityes = await City.findAll({ order: [['id', 'DESC']], raw: true });
    const cityesAndSrteetsAndHomes = await Promise.all(await cityes.map(async (city) => {
      const streets = await Street.findAll({ where: { city_id: city.id }, raw: true });
      const streetsAndHomes = await Promise.all(await streets.map(async (street) => {
        const homes = await Home.findAll({ where: { street_id: street.id }, raw: true });
        street.homes = homes;
        return street;
      }));
      city.streets = streetsAndHomes;
      return city;
    }));
    res.json({
      location: cityesAndSrteetsAndHomes,
      config: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const express = require('express');
const {
  Store, Category_store, User, Userinfo,
} = require('../db/models');

exports.createProductBaraholka = async (req, res) => {
  const {
    title, text, price, category, categoryId,
  } = req.body.product;
  const { url } = req.body;

  let newProduct;
  let categoryPR;

  try {
    if (!categoryId) {
      categoryPR = await Category_store.findOne({ where: { title: category } });
    }

    newProduct = await Store.create({
      user_id: req.session.user.id,
      title,
      text,
      price,
      status: url,
      category_id: categoryId || categoryPR.id,
    });

    allCategories = await Category_store.findAll({
      raw: true,
    });
    const categoryAndProduct = await Promise.all(
      await allCategories.map(async (category) => {
        const products = await Store.findAll({
          where: { category_id: category.id },
          include: [
            {
              model: User,
              attributes: ['id', 'nick_name', 'email'],
              include: [
                { model: Userinfo, attributes: ['phone', 'full_name'] },
              ],
            },
          ],
          raw: true,
        });
        category.products = products;
        return category;
      }),
    );
    res.json(categoryAndProduct);
  } catch (error) {
    return res.status(401).json({ err: error });
  }
};

exports.findAllProductAndCategories = async (req, res) => {
  let allCategories;
  let user;
  try {
    allCategories = await Category_store.findAll({
      raw: true,
    });

    const categoryAndProduct = await Promise.all(
      await allCategories.map(async (category) => {
        const products = await Store.findAll({
          where: { category_id: category.id },
          include: [
            {
              model: User,
              attributes: ['id', 'nick_name', 'email'],
              include: [
                { model: Userinfo, attributes: ['phone', 'full_name'] },
              ],
            },
          ],
          raw: true,
        });

        category.products = products;
        return category;
      }),
    );
    res.json(categoryAndProduct);
  } catch (error) {
    return res.status(401).json({ err: error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    del = await Store.destroy({ where: { id } });
  } catch (error) {
    return res.status(401).json({ err: error });
  }
  return res.json(del);
};

exports.checkBaraholka = async (res, req, next) => { };

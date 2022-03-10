const express = require('express');
const router = express.Router();




// router// Страница регистрации пользователя
//   .route('/signup')
  router.post('/signup', async (req, res, next) => {
    console.log(req.body)
    // multer({dest:`public/pics`}).single("photo")
    // req.files.photo.mv(`public/pics/`+ newEntry.id + '.' + req.files.photo.name.split('.').pop()); // прописывать имя файла в БД, тогда в hbs можно задавать ссылку без расширения
    // const [ name, password, email ] = req.body.title;
    // console.log('--------------------------------req.body: ', req.body);
    // let user, newUser;
    // try {
    //   newUser = await User.findOne({where: {[Op.or]: [{ name: name }, { email: email }]}})
    //   console.log(newUser)
    //   if (!newUser) {
    //       const saltRounds = 10;
    //       const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    //       user = await User.create({
    //         name,
    //         password: hashedPassword,
    //         email,
    //       });
  
    //       // Мы не храним пароль в БД, только его хэш
    //     // записываем в req.session.user данные (id & name) (создаем сессию)
    //       req.session.user = {id: user.id, name: user.name, id_db: user.id}; // req.session.user -> id, name
    //        return res.status(200).redirect('/entries'); // ответ 200 + автоматическое создание и отправка cookies в заголовке клиенту
    //   } else {
    //     res.render('entries/error', {
    //       message: 'name или email уже используются!.',
    //       error: {}
    //     });
    //   }
    // } catch (err) {
    //   console.error('Err message:', err.message);
    //   console.error('Err code', err.code);
    //   return failAuth(res, err.message);
    // }
    // res.status(200).redirect('/entries'); // ответ 200 + автоматическое создание и отправка cookies в заголовке клиенту
   
})


module.exports = router;

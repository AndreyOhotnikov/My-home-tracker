import React, { useEffect, useState } from "react";
import { Routes, Link, Route } from "react-router-dom";

// import SignIn from "../SignIn";
// import Signup from "../Signup";
// import Signout from "../Signout";
// import { useDispatch, useSelector } from 'react-redux';
// import { Navbar, Nav, Container } from "react-bootstrap";
// import style from "./Navigation.module.css"
// import WelcomePage from "../WelcomePage";
// import LockationHome from "../LockationHome";

// const Navigation = () => {
//   const dispatche = useDispatch()
//   const auth = useSelector(state => state.auth.auth)
//   // const posts = useSelector(state => state.postsR.posts)

//   // useEffect(() => {
//   //   if(!auth)  dispatche(checkedAuth())
//   // }, [])

//   // useEffect(() => {
//   //   if(auth && !posts.length) dispatche(getAllPosts())
//   // }, [auth])

//   return (
//     <div >
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Nav className="me-auto">
//             {/* <Link></Link> */}
//             { !auth && <Link className={style.link} to="/">Заметки</Link>}
//             { !auth && <Link className={style.link} to="/pictures">Картинка</Link>}
//             { !auth && <Link className={style.link} to="/signout">Выйти</Link>}
//             { !auth && <Link className={style.link} to="/signup">Регистрация</Link>}
//             { !auth && <Link className={style.link} to="/signin">Войти</Link>}
//           </Nav>
//         </Container>
//       </Navbar>
//       <Routes>

//           <Route path='/signout' element={<Signout />} />
//           <Route path='/signin' element={<SignIn/>} />
//           <Route path='/signup' element={<Signup/>} />
//           { !auth &&  <Route path='/' element={<WelcomePage/>} />}
//           { !auth &&  <Route path='/locationHome' element={<LockationHome/>} />}
//       </Routes>
//       {/* <WelcomePage/> */}
//     </div>
//   );
// };

// export default Navigation;
import HomeMain from "../HomeMain/HomeMain";
import BaraholkaBox from "../Baraholka/BaraholkaBox";
import BaraholkaForm from "../Baraholka/BaraholkaForm";
import BaraholkaList from "../Baraholka/BaraholkaList";
import BaraholkaItem from "../Baraholka/BaraholkaItem";

const Navigation = () => {
  return (
    <>
      <Link to="/baraholka">Купи/Продай</Link>
      <Link to="/addProduct">Разместить свой товар</Link>

      <Routes>
        <Route path="/baraholka" element={<BaraholkaBox />} />
        <Route path="/baraholka/:id" element={<BaraholkaList />} />
        <Route path="/product/:id" element={<BaraholkaItem />} />
        <Route path="/addProduct" element={<BaraholkaForm />} />
      </Routes>
    </>
  );
};

export default Navigation;

import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import BaraholkaBox from "../Baraholka/BaraholkaBox";
import BaraholkaForm from "../Baraholka/BaraholkaForm";
import BaraholkaList from "../Baraholka/BaraholkaList";
import BaraholkaItem from "../Baraholka/BaraholkaItem";
import Chat from "../Chat/Chat";
import SignIn from "../Signin/SignIn";
import Signup from "../Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import WelcomePage from "../WelcomePage/WelcomePage";
import LockationHome from "../Signup/LockationHome";
import { types } from "../../store/types/userTypes";
import { openModaleReducer } from "../../store/actionCreators/userAC";
import PrivatePageUser from "../PrivatePageUser/PrivatePageUser";
import {BenefitServicesList} from "../BenefitServices/BenefitServicesList";
import ModalPage from "../Signout/ModalPage";


import {
  Button,
  MenuItem,
  Tooltip,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  List,
  Divider,
  Box,
  AppBar,
} from "@mui/material";
import {
  styled,
  useTheme,
  Drawer,
} from "@mui/material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GlobalNewsList from "../GlobalNews/GlobalNewsList";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { BenefitServicesMain } from "../BenefitServices/BenefitServicesMain";
import { BenefitServicesForm } from "../BenefitServices/BenefitServicesForm";
import { BenefitServicesItem } from "../BenefitServices/BenefitServicesItem";

import { BidForm } from "../Bids/BidsForm";
import { AllBidsList } from "../PrivatePageChairman/AllBidsList";
import { BidsItem } from "../PrivatePageChairman/BidsItem";
import { servicesSagaApi } from "../../store/actionCreators/benefitServicesAC";
import { AllUsersList } from "../PrivatePageChairman/AllUsersList";
import GlobalNewsForm from "../GlobalNews/GlobalNewsForm";
import GlobalNewsItem from "../GlobalNews/GlobalNewItem";
import LocalNewsList from "../localNews/localNewsList";
import LocalNewsForm from "../localNews/localNewsForm";
import LocalNewsItem from "../localNews/localNewsItem";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navigation = () => {
  const dispatche = useDispatch();
  const auth = useSelector((state) => state.auth.auth);

  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => {
    if (open === true) setOpen(false);
  };

  useEffect(() => {
    if (!auth) dispatche({ type: types.CHECK_IS_AUTH_SAGA });
  }, []);

  const handleOpen = () => dispatche(openModaleReducer(true));

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const dispatch = useDispatch();
  useEffect(() => dispatch(servicesSagaApi()), []);
  return (
    <div onClick={handleDrawerClose}>
      {auth && (
        <AppBar position="static" onClick={handleDrawerClose}>
          <Container
            maxWidth="10px"
            style={{ paddingLeft: "5px", paddingRight: "5px" }}
          >
            <Toolbar disableGutters style={{ display: "contents" }}>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <div position="fixed" open={open}>
                  <Toolbar style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      // edge="start"
                      sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                    {pages.map(
                      (page) =>
                        auth.user && (
                          <Button
                            key={page.name}
                            onClick={() => navigate(page.src)}
                            sx={{ my: 2, color: "white", display: "block" }}
                          >
                            {page.name}
                          </Button>
                        )
                    )}
                  </Toolbar>
                </div>
                <Drawer variant="persistent" anchor="left" open={open}>
                  <DrawerHeader>
                    <IconButton
                      onClick={handleDrawerClose}
                      onClose={handleDrawerClose}
                    >
                      {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </IconButton>
                  </DrawerHeader>
                  <List onClick={handleDrawerClose} onClose={handleDrawerClose}>
                    {options.map(
                      (option, index) => (
                         <ListItem button key={option.name} onClick={() => navigate(option.src)}>
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={option.name} />
                        </ListItem>
                      )
                    )} 
                    {auth.role === 'chairman' && <ListItem button key={"Добавить Главную новость"} onClick={() => navigate("/form/:id")}>
                    <ListItemIcon> <MailIcon /> </ListItemIcon>
                          <ListItemText primary={"Добавить Главную новость"} />
                        </ListItem>}
                  </List>
                  <Divider />
                  <List onClick={handleDrawerClose} onClose={handleDrawerClose}>
                    {["Поддержка", "Памятки", "Общая информация"].map(
                      (text, index) => (
                        <ListItem button key={text} >
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                      )
                    )}
                  </List>
                  <Divider />
                  
                </Drawer>

                <div
                  style={{ display: "contents", zIndex: "20" }}
                  onClick={handleDrawerClose}
                >
                  <Tooltip title="Open settings" style={{ width: "0" }}>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                      style={{ zIndex: "15" }}
                    >
                      <Avatar alt="Remy Sharp" src="" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    style={{ zIndex: "10" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    onClick={handleDrawerClose}
                  >
                    {settings.map((setting) => {
                     if ( auth.role === setting.role || !setting.role) {
                     return (<MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography
                          onClick={(e) => {
                            setting.name === "Профиль" && navigate("/profile");
                            setting.name === "Выйти" && handleOpen(e);
                            (setting.name === "Все заявки" || setting.name === "Все пользователи") && navigate(setting.src);
                          }}
                          textAlign="center"
                        >
                          {setting.name}
                        </Typography>
                      </MenuItem>)}})}
                  </Menu>
                </div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      <Routes>
        <Route path="/services" element={<BenefitServicesMain />} />
        <Route path="/services/:id" element={<BenefitServicesList />} />
        <Route path="service/:id" element={<BenefitServicesItem />} />
        <Route path="/services/new" element={<BenefitServicesForm />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<PrivatePageUser />} />
        <Route path="/store" element={<BaraholkaList />} />
        <Route path="/addBid" element={<BidForm />} />
        <Route path="/GlobalNews" element={<GlobalNewsList />} />
        <Route path="/baraholka" element={<BaraholkaBox />} />
        <Route path="/baraholka/:id" element={<BaraholkaList />} />
        <Route path="/product/:id" element={<BaraholkaItem />} />
        <Route path="/addProduct" element={<BaraholkaForm />} />

        <Route path="/bids" element={<AllBidsList />} />
        <Route path="/users" element={<AllUsersList />} />
        <Route path="/bid/:id" element={<BidsItem />} />

        <Route path="/chat" element={<Chat />} />

        {!auth && <Route path="/" element={<WelcomePage />} />}
        {!auth && <Route path="/locationHome" element={<LockationHome />} />}
        {<Route  path="/form/:id" element={<GlobalNewsForm/>} ></Route>}
        {<Route  path="/global/:id" element={<GlobalNewsItem/>} ></Route>}
        {<Route  path="/global/put/:id" element={<GlobalNewsForm/>} ></Route>}
        {<Route  path="/localnews" element={<LocalNewsList/>} ></Route>}
        {<Route  path="/local/form/:id" element={<LocalNewsForm/>} ></Route>}
        {<Route  path="/local/:id" element={<LocalNewsItem/>} ></Route>}
        {<Route  path="/local/put/:id" element={<LocalNewsForm/>} ></Route>}
      </Routes>
      <ModalPage onClick={handleDrawerClose} />
    </div>
  );
}

export default Navigation;

const pages = [
  { name: "Главные новости", src: "/GlobalNews" },
  { name: "События", src: "/localnews" },
  { name: "Услуги", src: "/services" },
  { name: "Барахолка", src: "/baraholka" },
  { name: "ЧАТ", src: "/chat" },

];

const settings = [
  { name: "Профиль", src: "/profile" },
  { name: "Выйти", src: "/signout" },
  { role: 'chairman', name: "Все заявки", src: "/bids" },
  { role: 'chairman', name: "Все пользователи", src: "/users" },
];

const options = [
  { name: "Заявка,жалоба", src: "/addBid" },
  { name: "Добавить услугу", src: "/services/new" },
  { name: "Разместить свой товар", src: "/addProduct" },
  { name: "Добавить событие", src: "/local/form/:id" },
]

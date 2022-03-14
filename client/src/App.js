import './App.css';
import Navigation from './components/navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import GlobalNewsList from './components/GlobalNews/GlobalNewsList';
import GlobalNewsForm from './components/GlobalNews/GlobalNewsForm';
import { Provider } from "react-redux";
import { store } from './store/reducers/rootReducer.js';
import ShortGlobalNewsList from './components/GlobalNews/GlobalNewsShort';
function App() {
  return (
    <div className="App">
       <Provider store={store}>
       <BrowserRouter>
        {/* <Navigation/> */}
        {/* { <GlobalNewsList />} */}
        {/* {<GlobalNewsForm/>} */}
        <ShortGlobalNewsList />
     </BrowserRouter>
       </Provider>
     
    </div>
  );
}

export default App;

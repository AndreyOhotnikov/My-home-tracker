import './App.css';
import Navigation from './components/navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import HomeMain from './components/HomeMain/HomeMain'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navigation/> */}
        <HomeMain/>
     </BrowserRouter>
    </div>
  );
}

export default App;

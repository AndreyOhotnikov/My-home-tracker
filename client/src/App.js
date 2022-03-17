import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/reducers/rootReducer.js";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

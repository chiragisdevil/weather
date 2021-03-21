import './App.css';
import HomePage from "./pages/homepage/Homepage";
import WeatherPage from "./pages/weatherpage/WeatherPage";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

// Created 2 routes. First root points to the homepage to enter the location and second route displays the weather page

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/weather" component={WeatherPage} />
      </Switch>
    </Router>
  );
}

export default App;

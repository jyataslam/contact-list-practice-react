import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import EditPage from "./pages/editpage/editpage";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/edit/:id" component={EditPage} />
            </Switch>
        </div>
    );
}

export default App;

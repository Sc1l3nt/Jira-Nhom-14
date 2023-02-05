import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import Test from "./components/Test";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import HomeTemplateMobile from "./templates/HomeTemplate/HomeTemplateMobile";
import ReponsiveItem from "./components/ReponsiveItem";

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route index element={<Test />} />
        <Route
          path="/"
          element={
            <ReponsiveItem
              component={HomeTemplate}
              componentMobile={HomeTemplateMobile}
            />
          }
        ></Route>
        <Route path="*" />
      </Routes>
    </HistoryRouter>
  </Provider>
);

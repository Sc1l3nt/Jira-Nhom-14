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
import Test from './components/Test';
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import HomeTemplateMobile from "./templates/HomeTemplate/HomeTemplateMobile";
import ReponsiveItem from "./components/ReponsiveItem";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
//SCSS
import './index.scss'

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route index element={<Test />} />
        {/* <Route
          path="/"
          element={
            <ReponsiveItem
              component={LoginTemplate}
              componentMobile={LoginTemplateMobile}
            />
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="/"
          element={
            <ReponsiveItem
              component={HomeTemplate}
              componentMobile={HomeTemplateMobile}
            />
          }
        ></Route>
        <Route path="*" element={<PageNotFound />} />
        {/* PROJECT ROUTE  */}
        {/* <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<ProjectNew />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="projects/:id/edit" element={<ProjectEdit />} />
        <Route path="projects/:projectId/board" element={<Tasks />} /> */}
        {/* USER ROUTE  */}
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

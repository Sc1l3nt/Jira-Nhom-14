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
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import HomeTemplateMobile from "./templates/HomeTemplate/HomeTemplateMobile";
import ReponsiveItem from "./components/ReponsiveItem";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import Projects from "./pages/Projects/Projects";
import ProjectNew from "./pages/Projects/New/ProjectNew";
import ProjectDetail from "./pages/Projects/Detail/ProjectDetail";
import ProjectEdit from "./pages/Projects/Edit/ProjectEdit";
import ProjectManagement from "./pages/Projects/Management/ProjectManagement";
//SCSS
import "./index.scss";
import LoginTemplate from "./templates/LoginTemplate/LoginTemplate";
import LoginTemplateMobile from "./templates/LoginTemplate/LoginTemplateMobile";
import Test from "./components/Test";

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
              component={LoginTemplate}
              componentMobile={LoginTemplateMobile}
            />
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/"
          element={
            <ReponsiveItem
              component={HomeTemplate}
              componentMobile={HomeTemplateMobile}
            />
          }
        >
          {/* PROJECT ROUTE  */}
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<ProjectNew />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="projects/:id/edit" element={<ProjectEdit />} />
          <Route
            path="projects/:projectId/board"
            element={<ProjectManagement />}
          />
          {/* USER ROUTE  */}
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </HistoryRouter>
  </Provider>
);

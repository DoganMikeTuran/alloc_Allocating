import Pages from "layouts/Pages/Pages.jsx";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login";

var indexRoutes = [
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;

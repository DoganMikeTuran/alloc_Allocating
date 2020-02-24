import Dashboard from "views/Dashboard/Dashboard.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Pdfgen from "../views/Pdfgen/Pdfgen.js";
import UsersView from "../views/Users/UserView";
import CreateUserView from "../views/CreateUser/CreateUser";
import Form from "../views/Forms/RegularForms";
import CreateSkill from "../views/CreateSkill/CreateSkill";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard
  },
  {
    path: "/createskill",
    name: "createskill",
    icon: "design_app",
    component: CreateSkill
  },
  {
    path: "/forms",
    name: "form",
    icon: "design_app",
    component: Form
  },
  {
    path: "/createuser",
    name: "CreateUser",
    icon: "design_app",
    component: CreateUserView
  },
  {
    path: "/users",
    name: "Users",
    icon: "design_app",
    component: UsersView
  },

  {
    path: "/pdfgen",
    name: "PDF Generator",
    icon: "files_single-copy-04",
    component: Pdfgen
  },
  {
    collapse: true,
    path: "/maps",
    name: "Maps",
    state: "openMaps",
    icon: "location_pin",
    views: [
      {
        path: "/maps/google-maps",
        name: "Google Maps",
        mini: "GM",
        component: GoogleMaps
      },
      {
        path: "/maps/full-screen-maps",
        name: "Full Screen Map",
        mini: "FSM",
        component: FullScreenMap
      },
      {
        path: "/maps/vector-maps",
        name: "Vector Map",
        mini: "VM",
        component: VectorMap
      }
    ]
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "business_chart-pie-36",
    component: Charts
  },

  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;

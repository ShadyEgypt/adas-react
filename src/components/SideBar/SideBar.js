import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CodeIcon from "@mui/icons-material/Code";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top"></div>
      <div className="center">
        <ul>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="list-title">MODELS</p>

          <Link to="/models" style={{ textDecoration: "none" }}>
            <li>
              <CodeIcon className="icon" />
              <span>Test models</span>
            </li>
          </Link>
          <p className="list-title">DATA</p>
          <Link to="/bdd-data" style={{ textDecoration: "none" }}>
            <li>
              <FolderSpecialIcon className="icon" />
              <span>BDD data</span>
            </li>
          </Link>
          <Link to="/user-data" style={{ textDecoration: "none" }}>
            <li>
              <FolderIcon className="icon" />
              <span>Your data</span>
            </li>
          </Link>
          <p className="list-title">SERVICE</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Buy tokens</span>
            </li>
          </Link>
          <p className="list-title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


import {
  FaUser,
  FaBook,
  FaCode,
  FaProjectDiagram,
  FaStar,
  FaFileAlt,
  FaBuilding,
  FaGlobe,
  FaHeart,
  FaRocket,
  FaFlask,
  FaCog,
  FaServer,
  FaExternalLinkAlt,
  FaBookOpen,
  FaLifeRing,
  FaUsers,
  FaSignOutAlt,
  FaCircle,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {Link} from 'react-router-dom';
import "./Right.sider.css";

const Sidebar = ({hideSidebar}) => {
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="avatar">E</div>
        <div className="profile-info">
          <h3>ErVarunGupta</h3>
        </div>
        <div className="cross" onClick={hideSidebar} style={{marginLeft:'5rem'}}><RxCross2 /></div>
      </div>

      {/* Menu Items */}
      <ul className="menu">
        <li><Link to='/profile' className="profile-link"><FaUser /> Your profile</Link></li>
        <li><FaBook /> Your repositories</li>
        <li><FaCode /> Your Copilot</li>
        <li><FaProjectDiagram /> Your projects</li>
        <li><FaStar /> Your stars</li>
        <li><FaFileAlt /> Your gists</li>
        <li><FaBuilding /> Your organizations</li>
        <li><FaGlobe /> Your enterprises</li>
        <li><FaHeart /> Your sponsors</li>
      </ul>

      <hr />

      <ul className="menu">
        <li><FaServer /> GitHub MCP Server <span className="preview">Preview</span></li>
        <li><FaExternalLinkAlt /> GitHub Website</li>
        <li><FaBookOpen /> GitHub Docs</li>
        <li><FaLifeRing /> GitHub Support</li>
        <li><FaUsers /> GitHub Community</li>
      </ul>

      <hr />

      <ul className="menu">
        <li><FaSignOutAlt /> Sign out</li>
      </ul>

    
    </div>
  );
};

export default Sidebar;

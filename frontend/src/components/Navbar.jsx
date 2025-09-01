import "./nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
export const Navbar = ({displaySidebar, showSidebar}) => {
  return (
    <>
      <nav>
        <div className="left-nav-container">
          <div className="nav-item" onClick={displaySidebar}><GiHamburgerMenu /></div>
          <Link to='/dashboard' className="github-link"><div className="github-icon"><FaGithub /></div></Link>
          <Link to='/dashboard' className="github-link"><div className="dashboard"><p>Dashboard</p></div></Link>
        </div>
        <div className="right-nav-container">
          <div className="input-box">
            <CiSearch />
            <input type="text" placeholder="Type to search"/>
          </div>
          <div className="nav-item" style={{display: 'flex', gap:'0.2rem'}}>
            <Link to='/new' style={{textDecoration:'none', color:'#fff'}}><FaPlus /></Link>
            |
            <FaCaretDown />
          </div>
          <div className="nav-item">
            <FaRegDotCircle />
          </div>
          <div className="nav-item">
            <FaCodePullRequest />
          </div>
          <div className="profile" onClick={showSidebar}>
            <CgProfile />
          </div>
        </div>
      </nav>
    </>
  );
};

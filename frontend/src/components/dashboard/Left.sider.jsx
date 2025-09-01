import { FaGithub } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { GoProjectSymlink } from "react-icons/go";
import { GoCommentDiscussion } from "react-icons/go";
import { GoCodespaces } from "react-icons/go";
import { GoCopilot } from "react-icons/go";

import './Left.sider.css'

export const LeftSider = ({hideSidebar}) =>{
    return (
        <section className="left-container action-class">
            <div className="left-github-icon">
                <div className="github-icon"><FaGithub /></div>
                <div className="cross" onClick={hideSidebar}><RxCross2 /></div>
            </div>
            <div className="left-contents">
                <p><IoMdHome /> Home</p>
                <p><FaRegDotCircle /> Issues</p>
                <p><FaCodePullRequest /> Pull requests</p>
                <p><GoProjectSymlink /> Projects</p>
                <p><GoCommentDiscussion /> Discussions</p>
                <p><GoCodespaces /> Codespaces</p>
                <p><GoCopilot /> Copilot</p>
            </div>
        </section>
    )
}
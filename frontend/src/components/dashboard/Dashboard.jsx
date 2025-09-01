import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./dashboard.css";
import { Navbar } from "../Navbar";
import { LeftSider } from "./Left.sider";
import Sidebar from "./Right.sider";
import { useNavigate, Link } from "react-router-dom";

export const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allRepositories, setAllRepositories] = useState([]);
  const [allResultRepositories, setAllResultRepositories] = useState([]);
  
  const [allSearchQuery, setAllSearchQuery] = useState("");
  const [topSearchQuery, setTopSearchQuery] = useState("");
  const [leftShow, setLeftShow] = useState(false);
  const [rightShow, setRightShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchRepositories = async () => {
      const url = "http://localhost:3000/repo/getCurrRepos";
      const result = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();
      //   console.log(data.repositories);
      setRepositories(data.repositories);
    };

    const fetchAllRepositories = async () => {
      const url = "http://localhost:3000/repo/all";
      const response = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      //   console.log(data.allRepos);
      setAllRepositories(data.allRepos);
    };

    fetchRepositories();
    fetchAllRepositories();
  }, []);

  useEffect(() => {
    if (allSearchQuery.trim() === "") {
      setAllResultRepositories(allRepositories);
    } else {
      const searchedRepo = allRepositories.filter((repo) => {
        return repo.name.toLowerCase().includes(allSearchQuery.toLowerCase());
      });
      setAllResultRepositories(searchedRepo);
    }

    if(topSearchQuery.trim() === ""){
      setSearchResults(repositories);
    }else{
      const searchedRepo = repositories.filter((repo)=>{
        return repo.name.toLowerCase().includes(topSearchQuery.toLowerCase());
      })
      setSearchResults(searchedRepo);
    }
  }, [repositories,allRepositories, allSearchQuery, topSearchQuery]);

  return (
    <>
      <Navbar
        displaySidebar={() => setLeftShow(true)}
        showSidebar={() => setRightShow(true)}
      />

      <section className="wrapper-container">
        {leftShow ? (
          <LeftSider
            const
            hideSidebar={() => {
              setLeftShow(false);
            }}
          />
        ) : (
          ""
        )}
        <aside className="left-aside-container">
          <div className="aside-container">
            <div className="top-repositories">
              <p>Top repositories</p>
              <Link to="/new" className="new-repo-create">
                New
              </Link>
            </div>
            <div className="search-repository">
              <input
                type="text"
                placeholder="Find a repository..."
                value={topSearchQuery}
                onChange={(e) => setTopSearchQuery(e.target.value)}
              />
            </div>
            <div>
              {searchResults.map((repo) => {
                return (
                  <div key={repo._id} className="repo-name">
                    <p>{repo.name}</p>
                    {/* <p>{repo.description}</p> */}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
        <main className="main-container">
          <div>
            <h1>All Repositories</h1>
          </div>
          <div className="main-search-box">
            <input
              type="text"
              placeholder="Search..."
              value={allSearchQuery}
              onChange={(e) => setAllSearchQuery(e.target.value)}
            />
          </div>
          {allResultRepositories.map((repo) => {
            return (
              <div key={repo._id} className="repo-item-box">
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            );
          })}
        </main>
        <aside className="right-aside-container">
          <div className="right-contents">
            <h3>Upcoming Events</h3>
            <ul>
              <li>
                <p>Tech Conference - Dec 15</p>
              </li>
              <li>
                <p>Developer Meetup - Dec 25</p>
              </li>
              <li>
                <p>React Summit - Jan 5</p>
              </li>
            </ul>
          </div>
        </aside>

        {rightShow ? (
          <Sidebar
            const
            hideSidebar={() => {
              setRightShow(false);
            }}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

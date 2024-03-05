import roastrest_logo from "../assets/roastrest_icon.png";
import github_logo from "../assets/github_logo.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Navbar = ({
  showLogoutButton
}) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  function GitHubButton() {
    return <a href="https://github.com/kwon514/RoastRest" target="_blank" rel="noreferrer">
      <span className="inline-flex items-center"><img className="mb-3" src={github_logo} alt="GitHub logo" width="35px" /></span>
    </a>
  }

  function LogoutButton() {
    return <button className="bg-ba-1 hover:bg-ba-2 text-md text-white font-bold py-3 px-4 rounded-lg" onClick={Logout}>Logout</button>
  }

  const Logout = () => {
    axios.post("http://localhost:4000/api/user/logout", {}, { withCredentials: true });
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-screen-lg px-3 py-6">
      <div className="flex flex-warap items-center justify-between">
        <div>
          <a href="/">
            <span className="inline-flex items-center text-3xl font-medium">
              <img className="mr-2" src={roastrest_logo} alt="RoastRest logo of coffee beans" width="50px" />
              RoastRest
            </span>
          </a>
        </div>
        <div>
          {showLogoutButton ? <LogoutButton /> : <GitHubButton />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
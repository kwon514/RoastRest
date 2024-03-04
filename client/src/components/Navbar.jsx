import roastrest_logo from "../assets/roastrest_icon.png";
import github_logo from "../assets/github_logo.svg";

const Navbar = () => {
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
          <a href="https://github.com/kwon514/RoastRest" target="_blank" rel="noreferrer">
            <span className="inline-flex items-center"><img className="mb-3" src={github_logo} alt="GitHub logo" width="35px" /></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
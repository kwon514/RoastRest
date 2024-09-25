import roastrest_logo from 'assets/roastrest_icon.png';
import github_logo from 'assets/github_logo.svg';
import { Link } from 'react-router-dom';
import NavDropdown from './NavDropdown';

function Navbar({ showNavMenu }) {
  function GitHubButton() {
    return (
      <Link to="https://github.com/kwon514/RoastRest" target="_blank" rel="noreferrer">
        <span className="inline-flex items-center">
          <img className="mb-3" src={github_logo} alt="GitHub logo" width="35px" />
        </span>
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-between mx-auto px-10 py-4">
      <Link to="/">
        <div className="flex items-center">
          <span className="inline-flex items-center">
            <img className="mr-2" src={roastrest_logo} alt="RoastRest logo" width="45px" />
            <span className="hidden sm:inline-flex text-2xl font-semibold">RoastRest</span>
          </span>
        </div>
      </Link>
      <div>{showNavMenu ? <NavDropdown /> : <GitHubButton />}</div>
    </div>
  );
}

export default Navbar;

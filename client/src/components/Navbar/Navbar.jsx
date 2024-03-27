import roastrest_logo from 'assets/roastrest_icon.png';
import github_logo from 'assets/github_logo.svg';
import { useNavigate } from 'react-router-dom';
import NavDropdown from './NavDropdown';

function Navbar({ showLogoutButton }) {
  const navigate = useNavigate();

  function handleLogoClick() {
    navigate('/');
  }

  function GitHubButton() {
    return (
      <a href="https://github.com/kwon514/RoastRest" target="_blank" rel="noreferrer">
        <span className="inline-flex items-center">
          <img className="mb-3" src={github_logo} alt="GitHub logo" width="35px" />
        </span>
      </a>
    );
  }

  return (
    <div className="flex items-center justify-between mx-auto max-w-screen-lg px-3 py-6">
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <span className="inline-flex items-center text-3xl font-medium">
          <img
            className="mr-2"
            src={roastrest_logo}
            alt="RoastRest logo of coffee beans"
            width="50px"
          />
          <span className="hidden sm:inline-flex">RoastRest</span>
        </span>
      </div>
      <div>{showLogoutButton ? <NavDropdown /> : <GitHubButton />}</div>
    </div>
  );
}

export default Navbar;

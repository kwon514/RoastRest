import { forwardRef, useContext } from 'react';
import {
  Dropdown,
  Menu,
  MenuButton as BaseMenuButton,
  MenuItem as BaseMenuItem,
  CssTransition,
  PopupContext,
} from '@mui/base';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'helpers';

function NavDropdown() {
  const navigate = useNavigate();

  function ArrowIcon() {
    return (
      <svg
        className="inline"
        stroke="black"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    );
  }

  const createHandleMenuClick = (menuItem) => {
    if (menuItem === 'Dashboard') {
      return Dashboard;
    } else if (menuItem === 'Account') {
      return Account;
    } else if (menuItem === 'Log out') {
      return Logout;
    }
  };

  const Dashboard = () => {
    navigate('/dashboard');
  };

  const Account = () => {
    navigate('/account');
  };

  const Logout = () => {
    logoutUser().then(() => {
      navigate('/');
    });
  };

  return (
    <Dropdown>
      <MenuButton>
        <div>
          <span>Hi, {localStorage.getItem('name')}! </span>
          <ArrowIcon />
        </div>
      </MenuButton>
      <Menu slots={{ listbox: AnimatedListbox }}>
        <MenuItem onClick={createHandleMenuClick('Dashboard')}>Dashboard</MenuItem>
        <MenuItem onClick={createHandleMenuClick('Account')}>Account</MenuItem>
        <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.95rem;
  box-sizing: border-box;
  margin: 12px 0;
  min-width: 160px;
  border-radius: 6px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid #fff;
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = useContext(PopupContext);
  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;

  &:focus {
    background-color: #faf9f8;
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.5;
  padding: 8px 16px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  color: #1C2025;
  `
);

export default NavDropdown;

import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MenuIntroduction() {
    const navigate = useNavigate();

    function ArrowIcon() {
        return (<svg className="inline" stroke="black" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>)
    };

    const createHandleMenuClick = (menuItem) => {
        if (menuItem === "Log out") {
            return Logout;
        }
    };

    const Logout = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout`, {}, { withCredentials: true }).then(() => {
            localStorage.removeItem("name");
            navigate("/");
        });
    };

    return (
        <Dropdown>
            <MenuButton>
                <div>
                    <span>Hi, {localStorage.getItem("name")}! </span>
                    <ArrowIcon />
                </div>
            </MenuButton>
            <Menu slots={{ listbox: AnimatedListbox }}>
                <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
            </Menu>
        </Dropdown>
    );
}

const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
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
  `,
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
    const { ownerState, ...other } = props;
    const popupContext = React.useContext(PopupContext);
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

AnimatedListbox.propTypes = {
    ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:focus {
    background-color: #faf9f8;
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  color: #1C2025;
  `,
);
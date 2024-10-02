import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  KeyboardArrowDown,
  Dashboard,
  PersonOutlineOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import MenuButton from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { getCookie, logoutUser } from 'helpers';

const StyledMenuButton = styled((props) => <MenuButton disableRipple {...props} />)(
  ({ theme }) => ({
    fontSize: 15,
    textTransform: 'none',
    '&:hover': {
      background: 'transparent',
    },
  })
);

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '8px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

function NavDropdown() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const userName = getCookie('name');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    logoutUser().then(() => {
      navigate('/login', { state: { showToast: true, toastMessage: 'Logged out successfully!' } });
    });
  };

  return (
    <div>
      <StyledMenuButton
        id="navigation-menu-button"
        aria-controls={open ? 'navigation-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="inherit"
        disableRipple
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Hi, {userName}!
      </StyledMenuButton>
      <StyledMenu
        id="navigation-menu"
        MenuListProps={{
          'aria-labelledby': 'navigation-menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/account">
          <MenuItem onClick={handleClose} disableRipple>
            <PersonOutlineOutlined />
            Account
          </MenuItem>
        </Link>
        <Divider sx={{ my: 1, mx: 1.5 }} />
        <MenuItem onClick={Logout} disableRipple>
          <LogoutOutlined />
          Log Out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default NavDropdown;

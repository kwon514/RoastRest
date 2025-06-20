import roastrest_logo from 'assets/roastrest_icon.png';
import { Link } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import { AppBar, Grid2 as Grid } from '@mui/material';
import { MenuButton } from 'components';

function Navbar({ showNavMenu, mobileSidebar, setMobileSidebar }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: 1250,
        bgcolor: 'white',
        color: 'black',
        padding: '12px',
        boxShadow: 0,
        borderBottom: '1px rgb(229, 231, 235) solid',
      }}
    >
      <Grid container>
        <Grid size={6}>
          <Grid container>
            {showNavMenu ? (
              <MenuButton mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />
            ) : null}
            <Link to="/">
              <div className="flex items-center ml-1 sm:ml-4">
                <span className="inline-flex items-center">
                  <img className="mr-2" src={roastrest_logo} alt="RoastRest logo" width="45px" />
                  <span className="hidden sm:inline-flex text-2xl font-semibold">RoastRest</span>
                </span>
              </div>
            </Link>
          </Grid>
        </Grid>
        <Grid size={6} offset="auto" className="flex justify-end">
          <div className="mr-4 mt-1">{showNavMenu ? <NavDropdown /> : null}</div>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Navbar;

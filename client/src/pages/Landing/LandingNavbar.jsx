import { styled } from '@mui/material/styles';
import roastrest_logo from 'assets/roastrest_icon.png';
import { Link } from 'react-router-dom';
import { AppBar, Button, Grid2 as Grid } from '@mui/material';
import { MenuButton } from 'components';

const StyledButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: 14,
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: 4,
}));

function LandingNavbar({ showNavMenu, mobileSidebar, setMobileSidebar }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: 1250,
        bgcolor: '#fbf8f3',
        color: 'black',
        padding: '30px 12px 0 12px',
        boxShadow: 0,
      }}
    >
      <Grid container>
        <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 3, xxl: 2.5 }} className="flex items-center">
          <Grid container>
            {showNavMenu ? (
              <MenuButton mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />
            ) : null}
            <Link to="/">
              <div className="flex items-center ml-5 sm:ml-12 md:ml-12 lg:ml-28 xl:ml-36">
                <span className="inline-flex items-center">
                  <img className="mr-2" src={roastrest_logo} alt="RoastRest logo" width="45px" />
                  <span className="hidden sm:inline-flex text-2xl font-semibold">RoastRest</span>
                </span>
              </div>
            </Link>
          </Grid>
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4, xxl: 7 }} className="hidden sm:flex">
          <div className="flex items-center space-x-4 ml-0 sm:ml-6 lg:ml-8">
            <Link to="/dashboard">
              <StyledButton variant="text" color="inherit">
                Dashboard
              </StyledButton>
            </Link>
          </div>
        </Grid>
        <Grid
          size={{ xs: 4, sm: 4, md: 4, lg: 4, xxl: 2.5 }}
          offset="auto"
          className="flex justify-end"
        >
          <div className=" mr-1 md:mr-10 lg:mr-16 xl:mr-28 2xl:mr-44 mt-1">
            <Link to="/login">
              <StyledButton variant="contained" color="primary">
                Login
              </StyledButton>
            </Link>
          </div>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default LandingNavbar;

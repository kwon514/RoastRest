import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import LandingNavbar from './LandingNavbar';
import { isLoggedIn } from 'helpers';
import { Button, Grid2 as Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import landing_image from 'assets/landing_image.png';

const StyledCtaButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: 16,
  textTransform: 'none',
  padding: '14px 24px',
  borderRadius: 4,
}));

function Landing() {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const skipLanding = localStorage.getItem('skipLanding') === 'true';

  useEffect(() => {
    if (skipLanding) {
      navigate('/dashboard');
    }
  }, [navigate, userLoggedIn, skipLanding]);

  return skipLanding ? null : (
    <>
      <Helmet>
        <title>RoastRest: Log, Track, & Optimise Your Coffee</title>
      </Helmet>
      <LandingNavbar />
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, lg: 6, xl: 5 }} className="flex flex-col justify-center items-start">
          <div className="pt-36 px-10 sm:pl-16 md:pl-30 lg:pl-32 xl:pl-40">
            <h1 className="text-4xl 2xl:text-5xl/[1.3] font-bold text-rr-brown-primary">
              Brew the best possible cup of coffee by staying on top of your beans
            </h1>
            <div className="w-3/4 text-left my-6">
              <p className="text-base">
                Keep tabs on roast dates, rest days, and more with an easy-to-use tracker for your
                coffee beans.
              </p>
            </div>
            <Link to={userLoggedIn ? '/dashboard' : '/signup'}>
              <StyledCtaButton variant="contained" color="primary">
                Get started
              </StyledCtaButton>
            </Link>
          </div>
        </Grid>
        <Grid size={{ xs: 12, lg: 6, xl: 7 }} className="text-center">
          <div className="pt-32">
            <img
              src={landing_image}
              alt="RoastRest dashboard displayed on laptop"
              className="w-5/6 2xl:w-3/4 mx-auto"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Landing;

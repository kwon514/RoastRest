import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from 'components';
import { isLoggedIn } from 'helpers';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#634832',
    },
    secondary: {
      main: '#553E2B',
    },
  },
});

const StyledCtaButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: 20,
  textTransform: 'none',
  padding: '14px 24px',
  marginTop: 46,
  borderRadius: 8,
}));

function Landing() {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const skipLanding = localStorage.getItem('skipLanding');

  useEffect(() => {
    if (skipLanding === 'true') {
      navigate('/dashboard');
    }
  }, [navigate, userLoggedIn, skipLanding]);

  return (
    <>
      <Helmet>
        <title>RoastRest: Log, Track, & Optimise Your Coffee</title>
      </Helmet>
      <Navbar />
      <ThemeProvider theme={theme}>
        <div className="mx-auto max-w-screen-lg px-3 py-12 md:py-24">
          <header className="text-center">
            <h1 className="text-4xl sm:text-[3.5rem] px-2 md:px-0 leading-none font-black text-rr-brown-primary">
              Stay on top of your coffee rest periods.
            </h1>
            <p className="text-lg sm:text-2xl mt-6 sm:mt-10 px-5 md:px-20">
              Keep tabs on roast dates, rest days, and more with an easy-to-use tracker for your
              coffee beans.
            </p>
            <Link to={userLoggedIn ? '/dashboard' : '/login'}>
              <StyledCtaButton variant="contained" color="primary">
                Start logging ☕
              </StyledCtaButton>
            </Link>
          </header>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Landing;

import { Helmet } from 'react-helmet';
import LandingNavbar from './LandingNavbar';
import { Paper } from '@mui/material';

function About() {
  return (
    <>
      <Helmet>
        <title>About | RoastRest</title>
      </Helmet>
      <LandingNavbar />
      <div className="max-w-screen-lg mx-auto px-3">
        <Paper className="mx-auto mt-20 bg-white p-5">
          <h2 className="text-2xl font-semibold pb-2">About</h2>
          <p>
            <span className="leading-10">RoastRest was developed by yours truly - Kevin!</span>
            <br />
            As a Computer Science graduate and coffee enthusiast, I found myself struggling to find
            a convenient and intuitive way to keep track of my beans and brews. I wanted a smarter,
            simpler way to stay on top of my coffee - and that's how RoastRest came to life. It's a
            user-friendly platform designed to hgelp fellow coffee lovers manage their beans and
            always brew the perfect cup.
          </p>
        </Paper>
      </div>
    </>
  );
}

export default About;

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
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
        <Paper className="mx-auto mt-20 bg-white p-10">
          <h2 className="text-2xl font-semibold pb-2">About</h2>
          <p>
            <span className="leading-10">RoastRest was developed by yours truly - Kevin!</span>
            <br />
            As a Computer Science graduate and coffee enthusiast, I found myself struggling to find
            a convenient and intuitive way to keep track of my beans and brews. I wanted a smarter,
            simpler way to stay on top of my coffee - and that's how RoastRest came to life. It's a
            user-friendly platform designed to help fellow coffee lovers manage their beans and
            always brew the perfect cup.
          </p>
          <div className="flex items-center justify-end p-4 bg-white">
            <Link to="https://github.com/kwon514/RoastRest">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                alt="GitHub Logo"
                className="w-8 h-8 mx-2"
              />
            </Link>
            <Link to="https://www.linkedin.com/in/kevinxhwong/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                alt="LinkedIn Logo"
                className="w-8 h-8 mx-2"
              />
            </Link>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default About;

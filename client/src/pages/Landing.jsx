import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from 'components';
import { isLoggedIn } from 'helpers';

function Landing() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  isLoggedIn().then((res) => {
    res ? setUserLoggedIn(true) : setUserLoggedIn(false);
  });

  return (
    <>
      <Helmet>
        <title>RoastRest: Log, Track, & Optimise Your Coffee</title>
      </Helmet>
      <Navbar />
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
            <button className="bg-rr-brown-buttons hover:bg-rr-brown-hover text-xl text-white font-bold py-4 px-6 rounded-lg mt-12">
              Start logging ☕
            </button>
          </Link>
        </header>
      </div>
    </>
  );
}

export default Landing;

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const Landing = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const ctaPressed = () => {
    !cookies.token ? navigate("/login") : navigate("/dashboard");
  };
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-3 py-12 md:py-24">
        <header className="text-center"><h1 className="text-4xl sm:text-[3.5rem] px-2 md:px-0 leading-none font-black text-bc-2">Stay on top of your coffee rest periods.</h1>
          <p className="text-lg sm:text-2xl mt-6 sm:mt-10 px-5 md:px-20">Keep tabs on roast dates, rest days, and more with an easy-to-use tracker for your coffee beans.</p>
          <button className="bg-ba-1 hover:bg-ba-2 text-xl text-white font-bold py-4 px-6 rounded-lg mt-12" onClick={ctaPressed}>Start logging ☕</button>
        </header>
      </div>
    </>
  );
};

export default Landing;
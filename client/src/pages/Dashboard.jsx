import Navbar from "../components/Navbar";
import CoffeeCard from "../components/CoffeeCard";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {format} from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [coffeeData, setCoffeeData] = useState([]);
  useEffect(() => {
    const fetchCoffee = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/coffee/getAllCoffee",
        { withCredentials: true }
      );
      setCoffeeData(data);
    };
    if (!cookies.token) {
      navigate("/login");
    } else {
      fetchCoffee();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-3">
        <h2 className="text-4xl text-bc-2 font-bold text-center py-8">Coffee Dashboard</h2>
        <Grid container spacing={2}>
          {coffeeData.map((coffee) => (
            <Grid item xs={12} md={6} key={coffee._id}>
              <CoffeeCard
                name={coffee.name}
                coffeeName={coffee.coffeeName}
                roastDate={format(new Date(coffee.roastDate), "dd MMM yyyy")}
                restDays={coffee.restDays}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
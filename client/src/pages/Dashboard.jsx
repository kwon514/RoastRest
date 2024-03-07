import { Navbar, CoffeeCard, CoffeeDialog } from "../components";
import { Grid, Fab, createTheme, ThemeProvider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const theme = createTheme({
  palette: {
    primary: {
      main: "#896345",
    },
    secondary: {
      main: "#f0eee7",
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          position: "fixed",
          bottom: "20px",
          right: "20px",
        },
      },
    },
  },
});

function Dashboard() {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [coffeeData, setCoffeeData] = useState([]);
  const [open, setOpen] = useState(false);
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
  }, [cookies, navigate]);

  const handleAddCoffee = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navbar showLogoutButton={true} />
      <ThemeProvider theme={theme}>
        <div className="mx-auto max-w-screen-lg px-3">
          <h2 className="text-4xl text-bc-2 font-bold text-center py-8">Coffee Dashboard</h2>
          <Grid container spacing={2}>
            {coffeeData.map((coffee) => (
              <Grid item xs={12} sm={6} key={coffee._id}>
                <CoffeeCard
                  name={coffee.name}
                  coffeeName={coffee.coffeeName}
                  roastDate={format(new Date(coffee.roastDate), "dd MMM yyyy")}
                  restDays={12}
                />
              </Grid>
            ))}
          </Grid>
          <Fab color="primary" aria-label="add" onClick={handleAddCoffee}>
            <AddIcon color="secondary" />
          </Fab>
          <CoffeeDialog open={open} handleClose={handleAddCoffee} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
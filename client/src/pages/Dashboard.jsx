import { Navbar, CoffeeCard, CoffeeDialog } from "../components";
import { Grid, Fab, createTheme, ThemeProvider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { calcRestDays } from "../helpers";

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
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const updateCoffeeData = () => {
    axios.get("http://localhost:4000/api/coffee",
      { withCredentials: true }
    ).then((res) => {
      setCoffeeData(res.data);
    });
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    } else {
      updateCoffeeData();
    }
  }, [cookies, navigate]);

  const handleAddDialogClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpenAddDialog(!openAddDialog);
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
                  restDays={calcRestDays(coffee.roastDate, coffee.frozenStart, coffee.frozenEnd)}
                />
              </Grid>
            ))}
          </Grid>
          <Fab color="primary" aria-label="add" onClick={handleAddDialogClose}>
            <AddIcon color="secondary" />
          </Fab>
          <CoffeeDialog open={openAddDialog} handleClose={handleAddDialogClose} updateData={updateCoffeeData} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
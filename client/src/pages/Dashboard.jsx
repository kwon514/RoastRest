import { Navbar, CoffeeCard, AddCoffeeDialog, EditCoffeeDialog } from "../components";
import { Grid, Fab, createTheme, ThemeProvider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { calcRestDays, getCoffeeData } from "../helpers";

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
  const [coffeesData, setCoffeesData] = useState([]);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [coffeeData, setCoffeeData] = useState({});

  const updateCoffeesData = () => {
    axios.get("http://localhost:4000/api/coffee",
      { withCredentials: true }
    ).then((res) => {
      setCoffeesData(res.data);
    });
  };

  const editCoffeeData = (id) => {
    getCoffeeData(id).then((data) => {
      setCoffeeData(data);
      toggleEditDialog();
    });
  };

  const toggleEditDialog = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setEditDialog(!editDialog);
  }

  const toggleAddDialog = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setAddDialog(!addDialog);
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    } else {
      updateCoffeesData();
    }
  }, [cookies, navigate]);

  return (
    <>
      <Navbar showLogoutButton={true} />
      <ThemeProvider theme={theme}>
        <div className="mx-auto max-w-screen-lg px-3">
          <h2 className="text-4xl text-bc-2 font-bold text-center py-8">Coffee Dashboard</h2>
          <Grid container spacing={2}>
            {coffeesData.slice().reverse().map((coffee) => (
              <Grid item xs={12} sm={6} key={coffee._id}>
                <CoffeeCard
                  id={coffee._id}
                  name={coffee.name}
                  coffeeName={coffee.coffeeName}
                  roastDate={format(new Date(coffee.roastDate), "dd MMM yyyy")}
                  restDays={calcRestDays(coffee.roastDate, coffee.frozenStart, coffee.frozenEnd)}
                  editData={editCoffeeData}
                />
              </Grid>
            ))}
          </Grid>
          <Fab color="primary" aria-label="add" onClick={toggleAddDialog}>
            <AddIcon color="secondary" />
          </Fab>
          <AddCoffeeDialog open={addDialog} handleClose={toggleAddDialog} updateData={updateCoffeesData} />
          <EditCoffeeDialog open={editDialog} handleClose={toggleEditDialog} updateData={updateCoffeesData} coffeeData={coffeeData} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
import { Navbar, CoffeeCard, AddCoffeeDialog, ViewCoffeeDialog, EditCoffeeDialog } from "../components";
import { Grid, Fab, createTheme, ThemeProvider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCoffeeData } from "../helpers";

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
  const weightUnit = "g";
  const [cookies] = useCookies([]);
  const [coffeesData, setCoffeesData] = useState([]);
  const [coffeeData, setCoffeeData] = useState({});

  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);

  const updateCoffeesData = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/coffee`,
      { withCredentials: true }
    ).then((res) => {
      setCoffeesData(res.data);
    });
  };

  const viewCoffeeData = (id) => {
    getCoffeeData(id).then((data) => {
      setCoffeeData(data);
      toggleViewDialog();
    });
  };

  const editCoffeeData = (id) => {
    getCoffeeData(id).then((data) => {
      setCoffeeData(data);
      toggleEditDialog();
    });
  };

  const toggleViewDialog = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setViewDialog(!viewDialog);
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
        <div className="max-w-screen-lg mx-auto px-3 mb-24 xl:mb-0">
          <h2 className="text-4xl text-bc-2 font-bold text-center py-8">Coffee Dashboard</h2>
          <Grid container spacing={2}>
            {coffeesData.slice().reverse().map((coffee) => (
              <Grid item xs={12} sm={6} key={coffee._id}>
                <CoffeeCard
                  coffeeData={coffee}
                  weightUnit={weightUnit}
                  viewData={viewCoffeeData}
                  editData={editCoffeeData}
                  updateData={updateCoffeesData}
                />
              </Grid>
            ))}
          </Grid>
          <Fab color="primary" aria-label="add" onClick={toggleAddDialog}>
            <AddIcon color="secondary" />
          </Fab>
          <AddCoffeeDialog open={addDialog} handleClose={toggleAddDialog} updateData={updateCoffeesData} weightUnit={weightUnit} />
          <ViewCoffeeDialog open={viewDialog} handleClose={toggleViewDialog} coffeeData={coffeeData} weightUnit={weightUnit} />
          <EditCoffeeDialog open={editDialog} handleClose={toggleEditDialog} updateData={updateCoffeesData} coffeeData={coffeeData} weightUnit={weightUnit} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
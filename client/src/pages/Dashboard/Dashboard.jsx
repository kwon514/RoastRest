import { CoffeeCard, AddCoffeeDialog, ViewCoffeeDialog, EditCoffeeDialog } from './';
import { Navbar } from 'components';
import { isLoggedIn, getAllCoffeeData, getCoffeeData, sortCoffees } from 'helpers';
import { Grid, Fab, createTheme, ThemeProvider, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#896345',
    },
    secondary: {
      main: '#f0eee7',
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        },
      },
    },
  },
});

function Dashboard() {
  const navigate = useNavigate();
  const weightUnit = 'g';
  const [allCoffeeData, setAllCoffeeData] = useState([]);
  const [visibleCoffeeData, setVisibleCoffeeData] = useState([]);
  const [targetCoffeeData, setTargetCoffeeData] = useState({});

  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);

  let currentSort = useRef('creationDate');
  let searchBy = useRef('all');
  let duplicateDialog = useRef(false);

  const toggleViewDialog = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setViewDialog(!viewDialog);
  };

  const toggleEditDialog = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setEditDialog(!editDialog);
  };

  const toggleAddDialog = (event, reason, isDuplicate) => {
    if (reason && reason === 'backdropClick') return;
    else if (isDuplicate) {
      duplicateDialog.current = true;
    } else {
      duplicateDialog.current = false;
    }
    setAddDialog(!addDialog);
  };

  const searchOptions = [
    { value: 'all', label: 'All' },
    { value: 'name', label: ' Log Name' },
    { value: 'coffeeName', label: 'Coffee Name' },
    { value: 'coffeeRoaster', label: 'Roaster Name' },
  ];

  const handleSetSearchBy = (value) => {
    searchBy.current = value;
    handleSearch(getSearchValue());
  };

  const clearSearch = useCallback(() => {
    document.getElementById('search').value = '';
  }, []);

  const getSearchValue = () => {
    return document.getElementById('search').value;
  };

  const handleSearch = (value) => {
    let searchResults = [];
    if (searchBy.current === 'all') {
      searchResults = allCoffeeData.filter(
        (coffee) =>
          coffee.name.toLowerCase().includes(value.toLowerCase()) ||
          coffee.coffeeName.toLowerCase().includes(value.toLowerCase()) ||
          coffee.coffeeRoaster.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      searchResults = allCoffeeData.filter((coffee) =>
        coffee[searchBy.current].toLowerCase().includes(value.toLowerCase())
      );
    }
    setVisibleCoffeeData(sortCoffees(searchResults, currentSort.current));
  };

  const sortOptions = [
    { value: 'creationDate', label: 'Log Date' },
    { value: 'name', label: 'Log Name' },
    { value: 'coffeeName', label: 'Coffee Name' },
    { value: 'coffeeRoaster', label: 'Roaster' },
    { value: 'coffeeWeight', label: 'Weight' },
    { value: 'restDays', label: 'Rest Days' },
  ];

  const handleSort = (key) => {
    currentSort.current = key;
    setVisibleCoffeeData(sortCoffees(visibleCoffeeData, key));
  };

  const updateAllCoffeeData = useCallback(() => {
    getAllCoffeeData().then((coffees) => {
      clearSearch();
      setAllCoffeeData(coffees);
      setVisibleCoffeeData(sortCoffees(coffees, currentSort.current));
    });
  }, [clearSearch, currentSort]);

  const viewCoffeeData = (id) => {
    getCoffeeData(id).then((data) => {
      setTargetCoffeeData(data);
      toggleViewDialog();
    });
  };

  const editCoffeeData = (id) => {
    getCoffeeData(id).then((data) => {
      setTargetCoffeeData(data);
      toggleEditDialog();
    });
  };

  const duplicateCoffeeData = (id) => {
    getCoffeeData(id).then((data) => {
      setTargetCoffeeData(data);
      toggleAddDialog(null, null, true);
    });
  };

  useEffect(() => {
    isLoggedIn().then((res) => {
      if (res) {
        updateAllCoffeeData();
      } else {
        navigate('/login');
      }
    });
  }, [updateAllCoffeeData, navigate]);

  return (
    <>
      <Navbar showLogoutButton={true} />
      <ThemeProvider theme={theme}>
        <div className="max-w-screen-lg mx-auto px-3 mb-24 xl:mb-0">
          <h2 className="text-4xl text-rr-brown-primary font-bold text-center py-8">
            Coffee Dashboard
          </h2>
          <Grid container spacing={1} className="mb-4">
            <Grid item xs={3} sm={2}>
              <TextField
                select
                fullWidth
                id="searchBy"
                label="Search"
                variant="outlined"
                color="primary"
                defaultValue="all"
                onChange={(e) => handleSetSearchBy(e.target.value)}
              >
                {searchOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={9} sm={4}>
              <TextField
                fullWidth
                id="search"
                label="Search"
                variant="outlined"
                color="primary"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="inline-flex justify-end">
              <TextField
                select
                className="w-full sm:w-40"
                id="sortBy"
                label="Sort"
                variant="outlined"
                color="primary"
                defaultValue="creationDate"
                onChange={(e) => handleSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {visibleCoffeeData.slice().map((coffee) => (
              <Grid item xs={12} sm={6} key={coffee._id}>
                <CoffeeCard
                  coffeeData={coffee}
                  weightUnit={weightUnit}
                  viewData={viewCoffeeData}
                  editData={editCoffeeData}
                  duplicateData={duplicateCoffeeData}
                  updateData={updateAllCoffeeData}
                />
              </Grid>
            ))}
          </Grid>
          <Fab color="primary" aria-label="add" onClick={toggleAddDialog}>
            <AddIcon color="secondary" />
          </Fab>
          <AddCoffeeDialog
            open={addDialog}
            handleClose={toggleAddDialog}
            updateData={updateAllCoffeeData}
            coffeeData={targetCoffeeData}
            isDuplicate={duplicateDialog.current}
            weightUnit={weightUnit}
          />
          <ViewCoffeeDialog
            open={viewDialog}
            handleClose={toggleViewDialog}
            coffeeData={targetCoffeeData}
            weightUnit={weightUnit}
          />
          <EditCoffeeDialog
            open={editDialog}
            handleClose={toggleEditDialog}
            updateData={updateAllCoffeeData}
            coffeeData={targetCoffeeData}
            weightUnit={weightUnit}
          />
        </div>
      </ThemeProvider>
    </>
  );
}

export default Dashboard;

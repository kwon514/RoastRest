import {
  SearchSortPanel,
  CoffeeGrid,
  CoffeeGridSkeleton,
  AddCoffeeDialog,
  ViewCoffeeDialog,
  EditCoffeeDialog,
} from './';
import { Navbar } from 'components';
import { isLoggedIn, getAllCoffeeData, getCoffeeData, sortCoffees } from 'helpers';
import { Fab, createTheme, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

  const clearSearch = useCallback(() => {
    document.getElementById('search').value = '';
  }, []);

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
      <Helmet>
        <title>Coffee Dashboard | RoastRest</title>
      </Helmet>
      <Navbar showLogoutButton={true} />
      <ThemeProvider theme={theme}>
        <div className="max-w-screen-lg mx-auto px-3 mb-24">
          <h2 className="text-4xl text-rr-brown-primary font-bold text-center py-8">
            Coffee Dashboard
          </h2>
          <SearchSortPanel
            allCoffeeData={allCoffeeData}
            visibleCoffeeData={visibleCoffeeData}
            setVisibleCoffeeData={setVisibleCoffeeData}
            currentSort={currentSort}
            sortCoffees={sortCoffees}
          />
          {allCoffeeData.length === 0 ? (
            <CoffeeGridSkeleton />
          ) : (
            <>
              {visibleCoffeeData.some((coffee) => coffee.isPinned) && (
                <>
                  <h2 className="text-sm text-rr-brown-primary font-bold uppercase ml-2 mb-1">
                    Pinned
                  </h2>
                  <CoffeeGrid
                    coffeeData={visibleCoffeeData.filter((coffee) => coffee.isPinned)}
                    weightUnit={weightUnit}
                    viewData={viewCoffeeData}
                    editData={editCoffeeData}
                    duplicateData={duplicateCoffeeData}
                    updateData={updateAllCoffeeData}
                  />
                  <h2 className="text-sm text-rr-brown-primary font-bold uppercase ml-2 mb-1">
                    Others
                  </h2>
                </>
              )}
              <CoffeeGrid
                coffeeData={visibleCoffeeData.filter((coffee) => !coffee.isPinned)}
                weightUnit={weightUnit}
                viewData={viewCoffeeData}
                editData={editCoffeeData}
                duplicateData={duplicateCoffeeData}
                updateData={updateAllCoffeeData}
              />
            </>
          )}
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

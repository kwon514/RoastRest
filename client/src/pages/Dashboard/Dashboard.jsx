import {
  SearchSortPanel,
  CoffeeGrid,
  CoffeeGridSkeleton,
  AddCoffeeDialog,
  ViewCoffeeDialog,
  EditCoffeeDialog,
} from './';
import { Navbar, Sidebar } from 'components';
import {
  isLoggedIn,
  getAllCoffeeData,
  getCoffeeData,
  sortCoffees,
  toastMessage as universalToast,
  getUserData,
} from 'helpers';
import { Fab, Snackbar } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const weightUnit = 'g';

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [allCoffeeData, setAllCoffeeData] = useState([]);
  const [visibleCoffeeData, setVisibleCoffeeData] = useState([]);
  const [targetCoffeeData, setTargetCoffeeData] = useState({});

  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);

  const [mobileSidebar, setMobileSidebar] = useState(false);

  let currentSort = useRef('creationDate');
  let reverseSort = useRef(false);
  let duplicateDialog = useRef(false);

  const toggleViewDialog = (event, reason) => {
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

  const handleToast = (message) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  const updateAllCoffeeData = useCallback(() => {
    getAllCoffeeData().then((coffees) => {
      clearSearch();
      setAllCoffeeData(coffees);
      setVisibleCoffeeData(sortCoffees(coffees, currentSort.current, reverseSort.current));
      setIsLoadingData(false);
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
    if (isLoggedIn()) {
      updateAllCoffeeData();
      getUserData();
    } else {
      navigate('/login', {
        state: { showToast: true, toastMessage: 'Please log in to view your dashboard!' },
      });
    }
    if (location.state?.showToast) {
      universalToast('success', location.state.toastMessage);
      window.history.replaceState({}, '');
    }
  }, [updateAllCoffeeData, navigate, location.state]);

  return (
    <>
      <Helmet>
        <title>Coffee Dashboard | RoastRest</title>
      </Helmet>
      <Navbar
        showNavMenu={true}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />
      <Sidebar mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />
      <div className="mx-auto pl-4 sm:pl-24 lg:pl-72 pr-4 sm:pr-8 pt-12 mb-24">
        <SearchSortPanel
          allCoffeeData={allCoffeeData}
          visibleCoffeeData={visibleCoffeeData}
          setVisibleCoffeeData={setVisibleCoffeeData}
          currentSort={currentSort}
          reverseSort={reverseSort}
          sortCoffees={sortCoffees}
        />
        {isLoadingData ? (
          <CoffeeGridSkeleton />
        ) : (
          <>
            {visibleCoffeeData.some((coffee) => coffee.isPinned) && (
              <>
                <h2 className="text-sm text-rr-brown-primary font-semibold uppercase ml-2 mb-1">
                  Pinned
                </h2>
                <CoffeeGrid
                  coffeeData={visibleCoffeeData.filter((coffee) => coffee.isPinned)}
                  weightUnit={weightUnit}
                  viewData={viewCoffeeData}
                  editData={editCoffeeData}
                  duplicateData={duplicateCoffeeData}
                  updateData={updateAllCoffeeData}
                  toastMsg={handleToast}
                />
                <h2 className="text-sm text-rr-brown-primary font-semibold uppercase ml-2 mb-1">
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
              toastMsg={handleToast}
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
          toastMsg={handleToast}
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
          toastMsg={handleToast}
        />
        <Snackbar
          open={toastOpen}
          autoHideDuration={5000}
          onClose={() => setToastOpen(false)}
          message={toastMessage}
        />
        <ToastContainer />
      </div>
    </>
  );
}

export default Dashboard;

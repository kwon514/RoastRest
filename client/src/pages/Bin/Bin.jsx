import { BinSearchSortPanel, BinCoffeeGrid, BinCoffeeGridSkeleton, BinViewCoffeeDialog } from '.';
import { Navbar, Sidebar } from 'components';
import {
  isLoggedIn,
  getBinnedCoffeeData,
  getCoffeeData,
  sortCoffees,
  toastMessage as universalToast,
  getUserData,
} from 'helpers';
import { Snackbar } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Bin() {
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
  const [viewDialog, setViewDialog] = useState(false);

  const [mobileSidebar, setMobileSidebar] = useState(false);

  let currentSort = useRef('creationDate');
  let reverseSort = useRef(false);
  let duplicateDialog = useRef(false);

  const toggleViewDialog = (event, reason) => {
    setViewDialog(!viewDialog);
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
    getBinnedCoffeeData().then((coffees) => {
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
        <title>Bin | RoastRest</title>
      </Helmet>
      <Navbar
        showNavMenu={true}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />
      <Sidebar mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />
      <div className="mx-auto pl-4 sm:pl-24 lg:pl-72 pr-4 sm:pr-8 pt-12 mb-24">
        <BinSearchSortPanel
          allCoffeeData={allCoffeeData}
          visibleCoffeeData={visibleCoffeeData}
          setVisibleCoffeeData={setVisibleCoffeeData}
          currentSort={currentSort}
          reverseSort={reverseSort}
          sortCoffees={sortCoffees}
        />
        {isLoadingData ? (
          <BinCoffeeGridSkeleton />
        ) : (
          <BinCoffeeGrid
            coffeeData={visibleCoffeeData}
            weightUnit={weightUnit}
            viewData={viewCoffeeData}
            duplicateData={duplicateCoffeeData}
            updateData={updateAllCoffeeData}
            toastMsg={handleToast}
          />
        )}
        <BinViewCoffeeDialog
          open={viewDialog}
          handleClose={toggleViewDialog}
          coffeeData={targetCoffeeData}
          weightUnit={weightUnit}
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

export default Bin;

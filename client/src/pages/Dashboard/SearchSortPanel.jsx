import { useRef } from 'react';
import { Grid2 as Grid, TextField, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BiSortDown, BiSortUp } from 'react-icons/bi';

function SearchSortPanel({
  allCoffeeData,
  visibleCoffeeData,
  setVisibleCoffeeData,
  currentSort,
  reverseSort,
  sortCoffees,
}) {
  let searchBy = useRef('all');

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
    setVisibleCoffeeData(sortCoffees(searchResults, currentSort.current, reverseSort.current));
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
    setVisibleCoffeeData(sortCoffees(visibleCoffeeData, key, reverseSort.current));
  };

  const handleOrder = () => {
    reverseSort.current = !reverseSort.current;
    setVisibleCoffeeData(sortCoffees(visibleCoffeeData, currentSort.current, reverseSort.current));
  };

  return (
    <Grid container spacing={1} className="mb-4">
      <Grid size={{ xs: 4, sm: 3.5, md: 2.8, lg: 2.4, xl: 1.5 }}>
        <TextField
          select
          fullWidth
          id="searchBy"
          variant="outlined"
          color="primary"
          sx={{
            backgroundColor: 'white',
            borderRadius: '50px',
            '& fieldset': { border: 'none' },
            input: {
              '&::placeholder': {
                opacity: 0.75,
              },
            },
          }}
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
      <Grid size={{ xs: 8, sm: 4.5, md: 5.2, lg: 5.6, xl: 6.5 }}>
        <TextField
          fullWidth
          id="search"
          placeholder="Search"
          variant="outlined"
          color="primary"
          sx={{
            backgroundColor: 'white',
            borderRadius: '50px',
            maxWidth: '500px',
            '& fieldset': { border: 'none' },
            input: {
              '&::placeholder': {
                opacity: 0.75,
              },
            },
          }}
          onChange={(e) => handleSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ mr: 3 }} />,
            },
            inputLabel: {
              shrink: false,
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }} className="inline-flex justify-end">
        <IconButton
          aria-label="order"
          color="primary"
          onClick={handleOrder}
          sx={{
            width: '56px',
          }}
        >
          {reverseSort.current ? <BiSortDown size={24} /> : <BiSortUp size={24} />}
        </IconButton>
        <TextField
          select
          className="w-full sm:w-auto"
          id="sortBy"
          variant="outlined"
          color="primary"
          sx={{
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#f6f2ec',
            },
            '& fieldset': { border: 'none' },
            input: {
              '&::placeholder': {
                opacity: 0.75,
              },
            },
          }}
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
  );
}

export default SearchSortPanel;

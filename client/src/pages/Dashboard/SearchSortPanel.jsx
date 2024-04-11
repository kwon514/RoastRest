import { useRef } from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleOrder}
          sx={{
            margin: '0 0 0 0.5rem',
          }}
        >
          {reverseSort.current ? <BiSortDown size={24} /> : <BiSortUp size={24} />}
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchSortPanel;

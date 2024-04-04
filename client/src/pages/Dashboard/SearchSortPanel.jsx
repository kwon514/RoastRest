import { Grid, TextField, MenuItem } from '@mui/material';
import { useRef } from 'react';

function SearchSortPanel({
  allCoffeeData,
  visibleCoffeeData,
  setVisibleCoffeeData,
  currentSort,
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
      </Grid>
    </Grid>
  );
}

export default SearchSortPanel;
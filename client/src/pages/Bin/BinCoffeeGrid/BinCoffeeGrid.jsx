import { Grid2 as Grid } from '@mui/material';
import { BinCoffeeCard } from '..';

function BinCoffeeGrid({ coffeeData, weightUnit, viewData, duplicateData, updateData, toastMsg }) {
  return (
    <Grid container spacing={2} className="mb-6">
      {coffeeData.slice().map((coffee) => {
        return (
          <Grid size={{ xs: 12, md: 6, xl: 4 }} key={coffee._id}>
            <BinCoffeeCard
              coffeeData={coffee}
              weightUnit={weightUnit}
              viewData={viewData}
              duplicateData={duplicateData}
              updateData={updateData}
              toastMsg={toastMsg}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BinCoffeeGrid;

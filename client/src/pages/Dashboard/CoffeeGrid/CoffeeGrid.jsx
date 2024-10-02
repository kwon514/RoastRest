import { Grid2 as Grid } from '@mui/material';
import { CoffeeCard } from '..';

function CoffeeGrid({
  coffeeData,
  weightUnit,
  viewData,
  editData,
  duplicateData,
  updateData,
  toastMsg,
}) {
  return (
    <Grid container spacing={2} className="mb-6">
      {coffeeData.slice().map((coffee) => {
        return (
          <Grid size={{ xs: 12, md: 6, xl: 4 }} key={coffee._id}>
            <CoffeeCard
              coffeeData={coffee}
              weightUnit={weightUnit}
              viewData={viewData}
              editData={editData}
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

export default CoffeeGrid;

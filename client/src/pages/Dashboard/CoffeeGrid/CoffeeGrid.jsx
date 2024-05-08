import { Grid } from '@mui/material';
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
          <Grid item xs={12} sm={6} key={coffee._id}>
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

import { Grid } from '@mui/material';
import { CoffeeCardSkeleton } from './';

function CoffeeGridSkeleton() {
  return (
    <Grid container spacing={2}>
      {[...Array(6)].map((_, index) => (
        <Grid item key={index} xs={12} sm={6}>
          <CoffeeCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default CoffeeGridSkeleton;

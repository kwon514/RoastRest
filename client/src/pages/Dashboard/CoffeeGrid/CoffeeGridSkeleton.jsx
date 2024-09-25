import { Grid2 as Grid } from '@mui/material';
import { CoffeeCardSkeleton } from '..';

function CoffeeGridSkeleton() {
  return (
    <Grid container spacing={2}>
      {[...Array(6)].map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6 }}>
          <CoffeeCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default CoffeeGridSkeleton;

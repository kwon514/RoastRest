import { Grid2 as Grid } from '@mui/material';
import { BinCoffeeCardSkeleton } from '..';

function BinCoffeeGridSkeleton() {
  return (
    <Grid container spacing={2}>
      {[...Array(6)].map((_, index) => (
        <Grid key={index} size={{ xs: 12, md: 6, xl: 4 }}>
          <BinCoffeeCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default BinCoffeeGridSkeleton;

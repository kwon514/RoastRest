import { Grid2 as Grid } from '@mui/material';
import { CoffeeCardSkeleton } from '..';

function CoffeeGridSkeleton() {
  const cardCount = window.innerWidth > 1280 ? 9 : 6;

  return (
    <Grid container spacing={2}>
      {[...Array(cardCount)].map((_, index) => (
        <Grid key={index} size={{ xs: 12, md: 6, xl: 4 }}>
          <CoffeeCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default CoffeeGridSkeleton;

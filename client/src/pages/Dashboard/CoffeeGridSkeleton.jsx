import { Grid, Skeleton } from '@mui/material';

function CoffeeGridSkeleton() {
  return (
    <Grid container spacing={2}>
      {[...Array(6)].map((_, index) => (
        <Grid item key={index} xs={12} sm={6}>
          <Skeleton variant="rounded" height={235} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CoffeeGridSkeleton;

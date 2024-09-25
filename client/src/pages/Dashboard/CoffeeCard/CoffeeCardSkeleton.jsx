import { Skeleton, Card, CardContent, Grid2 as Grid } from '@mui/material';

function CoffeeCardSkeleton() {
  return (
    <Card sx={{ height: '234.25px' }}>
      <CardContent sx={{ padding: '8px 0 8px 16px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Skeleton variant="text" width="45%" height={36} />
            <Skeleton variant="text" width="50%" height={25} />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Skeleton variant="text" width="35%" height={20} />
            <Skeleton variant="text" width="50%" height={25} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="50%" height={25} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" width="25%" height={20} />
            <Skeleton variant="text" width="20%" height={25} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton variant="text" width="20%" height={25} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CoffeeCardSkeleton;

import { Skeleton, Card, CardContent, Grid2 as Grid } from '@mui/material';

function BinCoffeeCardSkeleton() {
  return (
    <Card sx={{ height: '234.25px' }}>
      <CardContent sx={{ padding: '8px 0 8px 16px' }}>
        <Grid container>
          <Grid size={12}>
            <Skeleton variant="text" width="45%" height={36} />
            <Skeleton variant="text" width="50%" height={25} />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={6}>
            <Skeleton variant="text" width="35%" height={20} />
            <Skeleton variant="text" width="50%" height={25} />
          </Grid>
          <Grid size={6}>
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="50%" height={25} />
          </Grid>
          <Grid size={6}>
            <Skeleton variant="text" width="25%" height={20} />
            <Skeleton variant="text" width="20%" height={25} />
          </Grid>
          <Grid size={6}>
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton variant="text" width="20%" height={25} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BinCoffeeCardSkeleton;

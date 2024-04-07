import { Card, Skeleton } from '@mui/material';

function CoffeeCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rounded" height={234.25} />
    </Card>
  );
}

export default CoffeeCardSkeleton;

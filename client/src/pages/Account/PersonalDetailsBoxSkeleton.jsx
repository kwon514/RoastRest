import { Skeleton, Paper } from '@mui/material';

function PersonalDetailsBoxSkeleton() {
  return (
    <Paper className="bg-white p-5">
      <h3 className="text-xl font-semibold pb-2">Personal details</h3>
      <Skeleton variant="rounded" width="100%" height={60} />
      <Skeleton variant="rounded" width="100%" height={60} className="mt-4" />
      <Skeleton variant="rounded" width="147px" height={36.5} className="mt-4" />
    </Paper>
  );
}

export default PersonalDetailsBoxSkeleton;

import { Card, CardContent, CardActions, Button, Grid2 as Grid } from '@mui/material';
import { CoffeeCardMenu } from '..';
import { calcRemainingDoses, calcRestDays, useCoffeeDose, isFrozen } from 'helpers';
import { formatDate } from 'date-fns';
import { FaRegSnowflake } from 'react-icons/fa';

function CoffeeCard({
  coffeeData,
  weightUnit,
  viewData,
  editData,
  duplicateData,
  updateData,
  toastMsg,
}) {
  const openViewDialog = () => {
    viewData(coffeeData._id);
  };

  const openEditDialog = () => {
    editData(coffeeData._id);
  };

  const restDays = calcRestDays(coffeeData.roastDate, coffeeData.frozenStart, coffeeData.frozenEnd);
  const remainingDoses = calcRemainingDoses(coffeeData.coffeeWeight, coffeeData.coffeeDose);

  const useDose = () => {
    useCoffeeDose(coffeeData._id, coffeeData.coffeeWeight, coffeeData.coffeeDose).then(() => {
      updateData();
      if (coffeeData.name) {
        toastMsg(`Used dose of ${coffeeData.name} (${coffeeData.coffeeName})`);
      } else {
        toastMsg(`Used dose of ${coffeeData.coffeeName}`);
      }
    });
  };

  return (
    <Card>
      <CardContent sx={{ padding: '8px 0 8px 16px' }}>
        <Grid container>
          <Grid size={11}>
            <h2 className="text-xl font-semibold mt-2">
              {coffeeData.name ? coffeeData.name : coffeeData.coffeeName}
            </h2>
            {coffeeData.name ? (
              <h3 className="text-md font-semibold mb-1">
                {coffeeData.coffeeName}{' '}
                {coffeeData.coffeeRoaster ? ' - ' + coffeeData.coffeeRoaster : ''}
              </h3>
            ) : (
              <h3 className="text-md font-semibold mb-1">
                {coffeeData.coffeeRoaster ? coffeeData.coffeeRoaster : '-'}
              </h3>
            )}
          </Grid>
          <Grid size={1} className="inline-flex justify-end">
            <CoffeeCardMenu
              coffeeData={coffeeData}
              updateData={updateData}
              duplicateData={duplicateData}
              toastMsg={toastMsg}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={6}>
            <h3 className="text-sm">Roast date:</h3>
            <p>{coffeeData.roastDate ? formatDate(coffeeData.roastDate, 'dd MMM yyyy') : '-'}</p>
          </Grid>
          <Grid size={6}>
            <h3 className="text-sm">Days of rest:</h3>
            <p>
              {restDays + ' days'}{' '}
              {coffeeData.isFrozen ? (
                <FaRegSnowflake size={14} className="inline text-cyan-400" />
              ) : null}
            </p>
          </Grid>
          <Grid size={6}>
            <h3 className="text-sm">Weight:</h3>
            <p>{coffeeData.coffeeWeight ? coffeeData.coffeeWeight + weightUnit : '-'}</p>
          </Grid>
          <Grid size={6}>
            <h3 className="text-sm">Remaining doses:</h3>
            <p>
              {coffeeData.coffeeWeight &&
              coffeeData.coffeeDose &&
              coffeeData.coffeeWeight >= coffeeData.coffeeDose
                ? remainingDoses
                : '-'}
            </p>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid size={12} container>
          <Grid size={6}>
            <Button size="large" sx={{ minWidth: 0 }} onClick={openViewDialog}>
              View
            </Button>
            <Button size="large" sx={{ minWidth: 0 }} onClick={openEditDialog}>
              Edit
            </Button>
          </Grid>
          <Grid size={6} className="inline-flex justify-end">
            <Button size="large" sx={{ minWidth: 0 }} onClick={useDose}>
              Use Dose
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default CoffeeCard;

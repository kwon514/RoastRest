import { Card, CardContent, CardActions, Button, Grid2 as Grid } from '@mui/material';
import { BinCoffeeCardMenu } from '..';
import { calcRemainingDoses, calcRestDays, isFrozen, unbinCoffeeData } from 'helpers';
import { formatDate } from 'date-fns';
import { FaRegSnowflake } from 'react-icons/fa';

function BinCoffeeCard({ coffeeData, weightUnit, viewData, duplicateData, updateData, toastMsg }) {
  const openViewDialog = () => {
    viewData(coffeeData._id);
  };

  const handleRestore = () => {
    unbinCoffeeData(coffeeData._id).then(() => {
      updateData();
      if (coffeeData.name) {
        toastMsg(`Restored ${coffeeData.name} (${coffeeData.coffeeName})`);
      } else {
        toastMsg(`Restored ${coffeeData.coffeeName}`);
      }
    });
  };

  const restDays = calcRestDays(coffeeData.roastDate, coffeeData.frozenStart, coffeeData.frozenEnd);
  const remainingDoses = calcRemainingDoses(coffeeData.coffeeWeight, coffeeData.coffeeDose);

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
            <BinCoffeeCardMenu
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
              {isFrozen(coffeeData.frozenStart, coffeeData.frozenEnd) ? (
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
        <Button size="large" sx={{ minWidth: 0 }} onClick={openViewDialog}>
          View
        </Button>
        <Button size="large" sx={{ minWidth: 0 }} onClick={handleRestore}>
          Restore
        </Button>
      </CardActions>
    </Card>
  );
}

export default BinCoffeeCard;

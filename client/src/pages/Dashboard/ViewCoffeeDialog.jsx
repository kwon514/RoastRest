import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { formatDate } from 'date-fns';
import DataViewField from './DataViewField';
import { calcRemainingDoses, calcRestDays } from 'helpers';

function ViewCoffeeDialog({ open, handleClose, coffeeData, weightUnit = 'g' }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('425'));

  const restDays = calcRestDays(coffeeData.roastDate, coffeeData.frozenStart, coffeeData.frozenEnd);
  const remainingDoses = calcRemainingDoses(coffeeData.coffeeWeight, coffeeData.coffeeDose);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle>{coffeeData.name}</DialogTitle>
      <DialogContent>
        <DataViewField label="Coffee name" value={coffeeData.coffeeName} />
        <DataViewField label="Roaster name" value={coffeeData.coffeeRoaster} />
        <DataViewField label="Rest days" value={restDays} />
        <DataViewField
          label="Weight"
          value={coffeeData.coffeeWeight ? coffeeData.coffeeWeight + weightUnit : '-'}
        />
        <DataViewField
          label="Dose"
          value={coffeeData.coffeeDose ? coffeeData.coffeeDose + weightUnit : '-'}
        />
        <DataViewField
          label="Remaining doses"
          value={
            coffeeData.coffeeWeight &&
            coffeeData.coffeeDose &&
            coffeeData.coffeeWeight > coffeeData.coffeeDose
              ? remainingDoses
              : '-'
          }
        />
        <DataViewField label="Roast level" value={coffeeData.roastLevel} />
        <DataViewField
          label="Roast date"
          value={coffeeData.roastDate ? formatDate(coffeeData.roastDate, 'dd MMM yyyy') : '-'}
        />
        <DataViewField
          label="Frozen start date"
          value={coffeeData.frozenStart ? formatDate(coffeeData.frozenStart, 'dd MMM yyyy') : '-'}
        />
        <DataViewField
          label="Frozen end date"
          value={coffeeData.frozenEnd ? formatDate(coffeeData.frozenEnd, 'dd MMM yyyy') : '-'}
        />
        <DataViewField label="Notes" value={coffeeData.notes} />
        <DataViewField label="Website" value={coffeeData.websiteUrl} link={true} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewCoffeeDialog;

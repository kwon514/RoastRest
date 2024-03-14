import { useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { formatDate } from "date-fns";
import DataViewField from './DataViewField';
import { calcRestDays } from '../helpers';

function ViewCoffeeDialog({ open, handleClose, coffeeData }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('425'));

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>
        {coffeeData.name}
      </DialogTitle>
      <DialogContent>
        <DataViewField label="Coffee Name" value={coffeeData.coffeeName} />
        <DataViewField label="Roaster" value={coffeeData.coffeeRoaster} />
        <DataViewField label="Rest Days" value={calcRestDays(coffeeData.roastDate, coffeeData.frozenStart, coffeeData.frozenEnd)} />
        <DataViewField label="Weight" value={coffeeData.coffeeWeight} />
        <DataViewField label="Dose" value={coffeeData.coffeeDose} />
        <DataViewField label="Roast Level" value={coffeeData.roastLevel} />
        <DataViewField label="Roast Date" value={coffeeData.roastDate ? formatDate(coffeeData.roastDate, "dd MMM yyyy") : "-"} />
        <DataViewField label="Frozen Start" value={coffeeData.frozenStart ? formatDate(coffeeData.frozenStart, "dd MMM yyyy") : "-"} />
        <DataViewField label="Frozen End" value={coffeeData.frozenEnd ? formatDate(coffeeData.frozenEnd, "dd MMM yyyy") : "-"} />
        <DataViewField label="Notes" value={coffeeData.notes} />
        <DataViewField label="Website" value={coffeeData.websiteUrl} link={true} />


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCoffeeDialog;
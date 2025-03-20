import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid2 as Grid,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { formatDate } from 'date-fns';
import DataViewField from './DataViewField';
import { calcRemainingDoses, calcRestDays, formatModifiedDate } from 'helpers';

function ViewCoffeeDialog({ open, handleClose, coffeeData, weightUnit = 'g' }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('425'));

  const restDays = calcRestDays(coffeeData.roastDate, coffeeData.frozenStart, coffeeData.frozenEnd);
  const remainingDoses = calcRemainingDoses(coffeeData.coffeeWeight, coffeeData.coffeeDose);
  const lastModifiedDate = formatModifiedDate(coffeeData.lastModifiedDate);

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
        <DataViewField label="Roast level" value={coffeeData.roastLevel} />
        <DataViewField label="Rest days" value={restDays} />
        <DataViewField
          label="Weight"
          value={coffeeData.coffeeWeight ? coffeeData.coffeeWeight + weightUnit : null}
        />
        <DataViewField
          label="Dose"
          value={coffeeData.coffeeDose ? coffeeData.coffeeDose + weightUnit : null}
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
        <DataViewField label="Website" value={coffeeData.websiteUrl} link={true} />
        <DataViewField label="Notes" value={coffeeData.notes} />
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: {
                xs: 0.35,
                sm: 0.2,
                md: 0.15,
              },
            },
            paddingLeft: 0,
            marginTop: 2,
          }}
        >
          {coffeeData.modifiedDates
            ? coffeeData.modifiedDates.map((item, index) => (
                <TimelineItem key={index} title={formatDate(item, 'dd MMM yyyy, h:mma')}>
                  <TimelineOppositeContent sx={{ paddingLeft: 0, textAlign: 'right' }}>
                    {formatDate(item, 'dd MMM')}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{coffeeData.modifiedLog[index]}</TimelineContent>
                </TimelineItem>
              ))
            : null}
        </Timeline>
      </DialogContent>
      <Grid container>
        <Grid size={6} className="flex items-center pl-6">
          {lastModifiedDate ? (
            <span className="text-sm text-gray-600">Last modified {lastModifiedDate}</span>
          ) : null}
        </Grid>
        <Grid size={6}>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ViewCoffeeDialog;

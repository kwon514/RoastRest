import { Card, CardContent, CardActions, Button, Grid } from '@mui/material';
import { calcRestDays, isFrozen } from '../helpers';
import { formatDate } from 'date-fns';
import axios from 'axios';

function CoffeeCard({ coffeeData, weightUnit, viewData, editData, updateData }) {
    const openViewDialog = () => {
        viewData(coffeeData._id);
    };

    const openEditDialog = () => {
        editData(coffeeData._id);
    };

    const restDays = calcRestDays(coffeeData.roastDate, coffeeData.frozenStart, coffeeData.frozenEnd);

    const useDose = () => {
        const newWeight = coffeeData.coffeeWeight - coffeeData.coffeeDose;
        const updatedCoffee = { coffeeWeight: newWeight };
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/coffee/${coffeeData._id}`,
            {
                coffeeWeight: newWeight,
            },
            { withCredentials: true }
        ).then(() => {
            updateData();
        });
    };

    return (
        <Card>
            <CardContent>
                <h2 className='text-xl font-bold'>{coffeeData.name}</h2>
                <h3 className='text-md font-bold mb-1'>{coffeeData.coffeeName} - {coffeeData.coffeeRoaster}</h3>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <h3 className='text-sm'>Roast date:</h3>
                        <p>{coffeeData.roastDate ? formatDate(coffeeData.roastDate, "dd MMM yyyy") : "-"}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <h3 className='text-sm'>Roast level:</h3>
                        <p>{coffeeData.roastLevel}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <h3 className='text-sm'>Weight:</h3>
                        <p>{coffeeData.coffeeWeight + weightUnit}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <h3 className='text-sm'>Days of rest:</h3>
                        <p>{restDays + " days"} {isFrozen(coffeeData.frozenStart, coffeeData.frozenEnd) ? "(frozen)" : null}</p>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid item xs={6}>
                        <Button size="large" sx={{ minWidth: 0 }} onClick={openViewDialog}>View</Button>
                        <Button size="large" sx={{ minWidth: 0 }} onClick={openEditDialog}>Edit</Button>
                    </Grid>
                    <Grid item xs={6} className='inline-flex justify-end'>
                        <Button size="large" sx={{ minWidth: 0 }} onClick={useDose}>Use Dose</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default CoffeeCard;
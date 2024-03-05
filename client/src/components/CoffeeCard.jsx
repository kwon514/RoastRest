import { Card, CardContent, CardActions, Button, Grid } from '@mui/material';

const CoffeeCard = ({
    name,
    coffeeName,
    roastDate,
    restTime
}) => {
    return (
        <Card>
            <CardContent>
                <h2 className='text-xl font-bold'>{name}</h2>
                <p className=''>{coffeeName}</p>
                <p>Roasted: {roastDate}</p>
            </CardContent>
            <Grid container>
                <Grid item xs={6}>
                    <CardActions>
                        <Button size="large" sx={{minWidth: 0}}>View</Button>
                        <Button size="large" sx={{minWidth: 0}}>Edit</Button>
                        <Button size="large" sx={{minWidth: 0}}>Freeze</Button>
                    </CardActions>
                </Grid>
                <Grid item xs={6} className='inline-flex items-center justify-end px-5'>
                    <span className='text-lg font-semibold'>{restTime} Days Rest</span>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CoffeeCard;
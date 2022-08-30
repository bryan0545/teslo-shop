import { Grid, Typography } from '@mui/material';

const OrdenSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$150</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuesto (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$20</Typography>
      </Grid>
      <Grid mt={2} item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid mt={2} item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">$170</Typography>
      </Grid>
    </Grid>
  );
};
export default OrdenSummary;

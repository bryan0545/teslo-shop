import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context';
import { currency } from '../../utilities';

const OrdenSummary = () => {
  const { numberOfItems, subtotal, total, tax } = useContext(CartContext);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`${numberOfItems} ${numberOfItems > 1 ? 'items' : 'item'}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subtotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{`Impuesto (${Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)`}</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Grid mt={2} item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid mt={2} item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
export default OrdenSummary;

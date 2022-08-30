import NextLink from 'next/link';
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts';
import CartList from '../../components/cart/CartList';
import { OrdenSummary } from '../../components/cart';

const Summary = () => {
  return (
    <ShopLayout title="Resumen de compra" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 Productos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>
                <NextLink href="/checkout/address">
                  <Link underline="always" display="flex" justifyContent="end">
                    Editar
                  </Link>
                </NextLink>
              </Box>
              <Typography>Bryan Rodas</Typography>
              <Typography>Carrera 1 # 11 - 11</Typography>
              <Typography>Benjamin Herrera</Typography>
              <Typography>Colombia</Typography>
              <Typography>+57 321545665</Typography>
              <Divider sx={{ my: 2 }} />
              <NextLink href="/cart">
                <Link underline="always" display="flex" justifyContent="end">
                  Editar
                </Link>
              </NextLink>
              <OrdenSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Cinfirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
export default Summary;

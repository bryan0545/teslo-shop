import NextLink from 'next/link';
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts';
import CartList from '../../components/cart/CartList';
import { OrdenSummary } from '../../components/cart';
import { CartContext } from '../../context';
import { useContext } from 'react';
import { countries } from '../../utilities';

const Summary = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);
  if (!shippingAddress) {
    return <></>;
  }
  const { firstName, lastName, address, address2 = '', zip, city, country, phone } = shippingAddress;

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
              <Typography variant="h2">
                Resumen ({numberOfItems} {numberOfItems === 1 ? 'Producto' : 'Productos'} )
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>
                <NextLink href="/checkout/address">
                  <Link underline="always" display="flex" justifyContent="end">
                    Editar
                  </Link>
                </NextLink>
              </Box>
              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 ? `, ${address2}` : ''}
              </Typography>
              <Typography>
                {city} {zip}
              </Typography>
              <Typography>{countries.find((c) => c.code === country)?.name}</Typography>
              <Typography>{phone}</Typography>
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

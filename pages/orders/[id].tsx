import NextLink from 'next/link';
import { Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts';
import CartList from '../../components/cart/CartList';
import { OrdenSummary } from '../../components/cart';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title="Resumen de la orden #2321" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Orden #2321
      </Typography>
      {/* <Chip sx={{ my: 2 }} label="Pendiente de pago" variant="outlined" color="error" icon={<CreditCardOffOutlined />/}>  */}
      <Chip sx={{ my: 2 }} label="Pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
      <Grid sx={{ my: 2 }} container>
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
                <h2>Pagar</h2>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
export default OrderPage;

import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';
import ProductList from '../components/products/ProductList';

const Home: NextPage = () => {
  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Descubre los mejores productos de Teslo aqui">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography sx={{ mb: 2 }} variant="h2">
        Todos los productos
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home;

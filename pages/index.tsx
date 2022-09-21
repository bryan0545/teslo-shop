import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import ProductList from '../components/products/ProductList';
import { FullScreenLoading } from '../components/ui';
import { useProducts } from '../hooks/useProducts';

const Home: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Descubre los mejores productos de Teslo aqui">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography sx={{ mb: 2 }} variant="h2">
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;

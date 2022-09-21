import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import ProductList from '../../components/products/ProductList';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title="Teslo-Shop - women" pageDescription="Descubre los mejores productos de Teslo para mujeres">
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography sx={{ mb: 2 }} variant="h2">
        Productos para mujeres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;

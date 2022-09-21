import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import ProductList from '../../components/products/ProductList';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout title="Teslo-Shop - Men" pageDescription="Descubre los mejores productos de Teslo para Hombres">
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>
      <Typography sx={{ mb: 2 }} variant="h2">
        Productos para hombres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;

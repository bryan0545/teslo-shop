import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import ProductList from '../../components/products/ProductList';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';

const KidsPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout title="Teslo-Shop - Kids" pageDescription="Descubre los mejores productos de Teslo para niños">
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography sx={{ mb: 2 }} variant="h2">
        Productos para niños
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidsPage;

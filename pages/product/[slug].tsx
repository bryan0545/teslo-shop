import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ShopLayout from '../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../components/products';
import ItemCounter from '../../components/ui/ItemCounter';
import SizeSelector from '../../components/products/SizeSelector';
import { IProduct, ICartProduct, ISizes } from '../../interfaces';
import { dbProducts } from '../../database';
import { Chip } from '@mui/material';
import { useContext, useState } from 'react';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const { addProductCart } = useContext(CartContext);

  const onSelectSize = (size: ISizes) => {
    setTempCartProduct((currentProduct) => ({ ...currentProduct, size }));
  };

  const updateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({ ...currentProduct, quantity }));
  };

  const addToCart = () => {
    if (!tempCartProduct.size && tempCartProduct.quantity > 0) return;
    addProductCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter currentValue={tempCartProduct.quantity} maxValue={product.inStock} updateQuantity={updateQuantity} />
              <SizeSelector sizes={product.sizes} selectedSize={tempCartProduct.size} onSelectSize={onSelectSize} />
            </Box>
            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn" onClick={addToCart}>
                {tempCartProduct.size ? 'Agregar al carrito' : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip label="No hay disponibles" color="error" variant="outlined" />
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from 'next';
// import { dbProducts } from '../../database';

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlug();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;

import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';
import tesloApi from '../../api/tesloApi';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { validations } from '../../utilities';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [showError, setShowError] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);
    if (hasError) {
      setShowErrorMessage(message!);
      return;
    }
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };

  return (
    <AuthLayout title="Registrarse">
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              {showError && <Chip label="Error al crear el usuario" sx={{ marginTop: 2 }} color="error" icon={<ErrorOutline />} className="fadeIn" />}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="filled"
                fullWidth
                {...register('name', { required: 'Este campo es requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', { required: 'Este campo es requerido', validate: validations.isEmail })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', { required: 'Este campo es requerido', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                error={!!errors.password}
                helperText={errors.password?.message}
              >
                Iniciar Sección
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login`} passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};
export default RegisterPage;

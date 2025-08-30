/** @format */

import * as zod from 'zod';
import axios from 'axios';
import { API_URL } from '../../constants';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Box, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff, AlternateEmail, Person } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

import type { UserType } from '../../types/user';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser, userLogged } from '../../utils/auth';

const RegisterPage = () => {
  // if user logged in we redirect user to dashboard page
  if (userLogged()) {
    return <Navigate to={'/dashboard'} replace />;
  }

  return (
    <>
      <div>Register page</div>
      <RegisterForm />

      <Box marginY={2}>
        <Link to={'/login'}>Login page</Link>
      </Box>
    </>
  );
};

const schema = zod
  .object({
    email: zod.email(),
    name: zod.string().min(1, { error: 'User name must be at least 1 character length' }),
    password: zod
      .string()
      .min(6, { error: 'Password must be at least 6 characters' })
      .regex(/(?=.*[A-Z])/, { error: 'Should contain at least one uppercase letter' })
      .regex(/(?=.*[a-z])/, { error: 'Should contain at least one lowercase letter' })
      .regex(/(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=])/, { error: 'Should contain at least one special symbol' }),
    confirmPassword: zod.string(),
  })
  .refine((params) => params.confirmPassword === params.password, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFieldType = UserType & zod.infer<typeof schema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFieldType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFieldType) => {
    // we supposed to hash password here for better security but for assignment i guess it is ok :)
    try {
      const { data } = await axios.post(`${API_URL}/users`, values);
      toast.success('You were registered successfully.');
      loginUser(data);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box maxWidth={'sm'}>
        <Box marginY={2}>
          <Controller
            control={control}
            name='name'
            render={({ field }) => (
              <TextField
                autoFocus
                fullWidth
                size='small'
                value={field.value}
                label='User name'
                onChange={(event) => {
                  field.onChange(event);
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder='John Smith'
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Person />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          ></Controller>
        </Box>

        <Box marginY={2}>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <TextField
                fullWidth
                size='small'
                value={field.value}
                label='User email'
                onChange={(event) => {
                  field.onChange(event);
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder='andrew@gmail.com'
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          ></Controller>
        </Box>

        <Box marginY={2}>
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <TextField
                fullWidth
                value={field.value}
                error={!!errors.password}
                size='small'
                label='Password'
                placeholder='Enter your password'
                onChange={(event) => {
                  field.onChange(event);
                }}
                helperText={
                  errors.password?.message
                    ? errors.password?.message
                    : 'Password should have at least 6 characters, 1 uppercase, 1 lowercase, and 1 special symbol'
                }
                slotProps={{
                  input: {
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                      <InputAdornment sx={{ margin: 0 }} position='end'>
                        <IconButton
                          size='small'
                          onClick={() => {
                            setShowPassword((prevValue) => !prevValue);
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>

        <Box marginY={2}>
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <TextField
                fullWidth
                value={field.value}
                error={!!errors.confirmPassword}
                size='small'
                label='Repeat your password'
                placeholder='Enter your password'
                onChange={(event) => {
                  field.onChange(event);
                }}
                helperText={errors.confirmPassword?.message}
                slotProps={{
                  input: {
                    type: 'password',
                  },
                }}
              />
            )}
          />
        </Box>

        <Box marginY={2}>
          <Button fullWidth type='submit' variant='contained' loading={isSubmitting}>
            Login
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RegisterPage;

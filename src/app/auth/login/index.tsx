/** @format */

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, IconButton, InputAdornment, TextField, Button, Typography } from '@mui/material';
import { Visibility, VisibilityOff, AlternateEmail } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { API_URL } from '../../../constants';
import axios from 'axios';
import type { UserType } from '../../../types/user';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';

const LoginPage = () => {
  return (
    <Box className='min-h-screen grid  place-items-center '>
      <Box className='bg-white p-5 rounded-2xl flex '>
        <LoginForm />
      </Box>
    </Box>
  );
};

const schema = zod.object({
  email: zod.email(),
  password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/(?=.*[A-Z])/, { message: 'Should contain at least one uppercase letter' })
    .regex(/(?=.*[a-z])/, { message: 'Should contain at least one lowercase letter' })
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=])/, { message: 'Should contain at least one special symbol' }),
});

type FieldType = zod.infer<typeof schema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const fetchUserByEmail = async (email: string): Promise<UserType | null> => {
    try {
      const { data } = await axios.get(`${API_URL}/users`);
      return data.find((user: UserType) => user.email === email) || null;
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
      return null;
    }
  };

  const isPasswordValid = (user: UserType, password: string): boolean => {
    return user.password === password;
  };

  const onSubmit = async (values: FieldType) => {
    const user = await fetchUserByEmail(values.email);

    if (!user) {
      toast.error('There is no such user');
      return;
    }

    if (!isPasswordValid(user, values.password)) {
      toast.error('Incorrect credentials');
      return;
    }

    login(user);
    toast.success('You logged in successfully.');
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box maxWidth={400} className='p-5'>
        <Box marginY={3}>
          <Typography variant='h4' align='center' fontWeight='bold'>
            Agent Login
          </Typography>
        </Box>

        <Box marginY={3}>
          <Typography variant='body1' align='center' color='textSecondary'>
            Hey. Enter your details to get sign in to your account
          </Typography>
        </Box>

        <Box marginY={3}>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <TextField
                autoFocus
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

        <Box marginY={3}>
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
                type='password'
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
          <Button type='submit' fullWidth variant='contained' loading={isSubmitting}>
            Login
          </Button>

          <Box className='mt-2 flex' justifyContent={'flex-end'}>
            <Link to={'/register'}>Don't have an account yet?</Link>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default LoginPage;

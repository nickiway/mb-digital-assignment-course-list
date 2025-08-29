/** @format */

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff, AlternateEmail } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { userLogged } from '../../utils/auth';
import { Navigate } from 'react-router';

const LoginPage = () => {
  // if user logged in we redirect user to dashboard page
  if (userLogged()) {
    return <Navigate to={'/dashboard'} replace />;
  }
  return (
    <>
      <div>Login page</div>
      <LoginForm />
    </>
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
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: FieldType) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box maxWidth={'sm'}>
        <Box marginY={2}>
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
      </Box>
      <Button type='submit' variant='contained'>
        Login
      </Button>
    </form>
  );
};

export default LoginPage;

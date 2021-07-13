import React, { useEffect, useState } from 'react';
import storage from 'store';
import cx from 'classnames';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import parseRouter from '@/utils/parseRouter';
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  FormHelperText,
  IconButton,
  CircularProgress,
  Button,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { requestAdminUserLogin } from '@/services/Admin/index';
import styles from '@/styles/localStyle/signIn';
interface Iprops {
  classes: any;
}

const AdminLogin = (props: Iprops) => {
  const router = useRouter();
  const { classes } = props;
  const [user, setUser] = useState(storage.get('adminUser'));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const passwordInput: any = React.createRef();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const { push } = parseRouter(router);
    if (user) {
      push('/admin');
    }
  }, [user]);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSave = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    const data = await requestAdminUserLogin(values);
    if (data.status === false) {
      setError(data.data);
      setIsLoading(false);
    } else {
      setUser(data.data);
      setIsLoading(false);
    }
    resetForm(values);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSave}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
        }) => (
          <div className={classes.root}>
            <Grid container className={classes.container}>
              <Typography className={classes.title}>Admin Login</Typography>
              <TextField
                id="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13 && passwordInput.current) {
                    passwordInput.current.focus();
                  }
                }}
                className={cx(classes.fieldMargin, classes.textInput)}
                fullWidth
                error={!!errors.email && touched.email}
                helperText={errors.email}
                autoFocus
              />
              <FormControl
                className={classes.fieldMargin}
                fullWidth
                error={!!errors.password && touched.password}
                aria-describedby="password-helper-text"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  className={classes.textInput}
                  inputRef={passwordInput}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      handleSubmit();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && touched.password && (
                  <FormHelperText id="password-helper-text">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              {error && (
                <FormHelperText className={classes.fieldMargin} error>
                  {error}
                </FormHelperText>
              )}

              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSubmit()}
                disabled={isLoading}
              >
                Sign In
                {isLoading && (
                  <CircularProgress
                    className={classes.progress}
                    size={15}
                    color="inherit"
                  />
                )}
              </Button>
            </Grid>
          </div>
        )}
      </Formik>
    </>
  );
};

export default withStyles(styles)(AdminLogin);

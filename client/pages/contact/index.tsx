import React, { useState } from 'react';
import * as yup from 'yup';
import cx from 'classnames';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  CircularProgress,
  Button,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import sendContactDetails from '@/services/Contact';
import Notifications from 'react-notify-toast';
import styles from '@/styles/localStyle/contact';

const About = (props: any) => {
  const { classes } = props;
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
  });

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSave = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    const data = await sendContactDetails(values);
    if (data.status === false) {
      setError(data.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    resetForm(values);
  };

  return (
    <Grid container className={classes.root} direction="column">
      <Notifications />
      <Grid className={classes.headingContainer}>
        <Typography className={classes.heading}>Contact</Typography>
        <Grid className={classes.border} />
      </Grid>
      <Grid container wrap="wrap" alignItems="center" justify="space-between" className={classes.mainContent}>
        <Grid item xs={12} md={4} className={classes.ownerDetails}>
          <Typography className={classes.subHeading}>Email</Typography>
          <Typography className={classes.texts}>xyx@gmail.com</Typography>
          <Typography className={classes.subHeading}>Address</Typography>
          <Typography className={classes.texts}>India</Typography>
        </Grid>
        <Grid item className={classes.formContainer} xs={12} md={5}>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSave}>
            {({
              values, errors, handleChange, handleSubmit, handleBlur, touched,
            }) => (
              <div className={classes.formRoot}>
                <Grid container className={classes.container}>
                  <Typography className={classes.formHeading}>Get in touch</Typography>
                  <TextField
                    id="name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cx(classes.fieldMargin, classes.textInput)}
                    fullWidth
                    error={!!errors.name && touched.name}
                    helperText={errors.name}
                    variant="outlined"
                  />
                  <TextField
                    id="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cx(classes.fieldMargin, classes.textInput)}
                    fullWidth
                    error={!!errors.email && touched.email}
                    helperText={errors.email}
                    variant="outlined"
                  />
                  <TextField
                    id="message"
                    placeholder="Message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cx(classes.fieldMargin, classes.textInput)}
                    fullWidth
                    error={!!errors.message && touched.message}
                    helperText={errors.message}
                    multiline
                    rows={4}
                    variant="outlined"
                  />

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
                    disabled={
                      isLoading
                      || !values.name
                      || !values.message
                      || !values.email
                    }
                  >
                    Send
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(About);

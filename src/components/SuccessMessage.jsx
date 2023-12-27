import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessCard = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <IconButton color="success" aria-label="Success">
              <CheckCircleOutlineIcon fontSize="large" color="success" />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h6" component="div">
              Success! Dynamic Search Ads Created
            </Typography>
            <Typography variant="body1">
              Your dynamic search ads have been successfully created.
              {/* Additional success details or instructions can be added here */}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
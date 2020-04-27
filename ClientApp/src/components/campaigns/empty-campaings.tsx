import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const EmptyCampaigns = () => (
  <Paper className="empty-campaigns-container">
    <Typography variant="h5" component="h2">
      To create campaings, click on the "Add Campaign" button on the bottom right.
    </Typography>
  </Paper>
);
import React from 'react';
import { AppBar, makeStyles, Typography } from '@material-ui/core';

import textResources from '../../constants/textResources';

const useStyles = makeStyles(theme => ({
  root: {},
  appBar: {
    top: 'auto',
    height: 32,
    bottom: 0
  },
  text: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    textAlign: 'right'
  }
}));

const BottomBar = () => {
  const classes = useStyles();

  return (
    <AppBar color="primary" className={classes.appBar}>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        className={classes.text}
      >
        {textResources.app.footer}
      </Typography>
    </AppBar>
  );
};

export default BottomBar;

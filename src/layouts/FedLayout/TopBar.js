import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, makeStyles, Box, List
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';

const useStyles = makeStyles({
  root: {},
  navigation: {
    display: 'flex'
  },
  toolbar: {
    height: 64
  }
});

const items = [
  {
    href: '/main',
    icon: FavoriteIcon,
    title: 'Main'
  },
  {
    href: '/discover',
    icon: RestoreIcon,
    title: 'Discover'
  }];

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>

        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <List className={classes.navigation}>
            {items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;

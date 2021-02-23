import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Card,
  CardHeader,
  Divider,
  makeStyles,
  ListItem,
  ListItemAvatar,
  List,
  ListItemText,
  IconButton,
  Tooltip
} from '@material-ui/core';

import { useStores } from '../../contexts';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

const LikedVideos = ({ className, videos, ...rest }) => {
  const { videoStore } = useStores();
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="List of Liked Videos" />
      <Divider />
      <PerfectScrollbar>
        <List className={classes.list}>
          {videos.map(video => (
            <ListItem key={video.id}>
              <ListItemAvatar>
                <FavoriteIcon />
              </ListItemAvatar>
              <ListItemText primary={video.title} secondary="Jan 9, 2014" />
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => videoStore.setFavourite(video.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </PerfectScrollbar>
    </Card>
  );
};

LikedVideos.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array.isRequired
};

export default LikedVideos;

import React from 'react';
import { makeStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';
import {
  Card,
  CardHeader, Divider,
  GridList
} from '@material-ui/core';
import clsx from 'clsx';
import VideoItem from '../../components/VideoItem';
import videoStore from '../../store/app-store';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '90vw',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  video: {
    width: 'auto',
    height: '100%'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

const HorizontalVideoList = ({
  className, title, videos, ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={title} />
      <Divider />
      <GridList className={classes.gridList}>
        {videos.length > 0 && videos.map((video) => (
          <VideoItem
            key={video.id}
            className={classes.video}
            onFavourite={() => videoStore.setFavourite(video.id)}
            video={video}
          />
        ))}
      </GridList>

    </Card>
  );
};

HorizontalVideoList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  videos: PropTypes.array.isRequired
};

export default HorizontalVideoList;

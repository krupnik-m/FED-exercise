import React from 'react';
import { makeStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';
import {
  Card,
  CardHeader, Divider,
  GridList, GridListTile
} from '@material-ui/core';
import clsx from 'clsx';
import VideoItem from '../../components/VideoItem';
import { useStores } from '../../contexts';

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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  gridItem: {
    width: '160'
  },
  video: {
    width: '160',
    height: 'auto'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

const HorizontalVideoList = ({ className, videos, ...rest }) => {
  const classes = useStyles();
  console.log('videos', videos);
  const { videoStore } = useStores();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="List of Liked Videos" />
      <Divider />
      <GridList className={classes.gridList}>
        {videos.length > 0 && videos.map((video) => (
          <GridListTile className={classes.gridItem} key={video.id}>
            <VideoItem
              className={classes.video}
              onFavourite={() => videoStore.setFavourite(video.id)}
              video={video}
            />
          </GridListTile>
        ))}
      </GridList>

    </Card>
  );
};

HorizontalVideoList.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array.isRequired
};

export default HorizontalVideoList;

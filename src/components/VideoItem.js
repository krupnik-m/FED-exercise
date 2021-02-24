import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    color: theme.palette.text.white,
  },
  description: {
    color: theme.palette.text.white,
    fontSize: 10
  },
  titleBar: {
    color: theme.palette.text.white,
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

const VideoItem = ({
  className, onFavourite, video, ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <video
        className={className}
        poster={video.posterUrl}
        preload="true"
        controls
        loop
      >
        <source src={video.videoUrl} type="video/mp4" />
        <track
          default
          kind="captions"
          srcLang="en"
          src={video.videoUrl}
          label={video.title}
        />
      </video>
      <p className={classes.titleBar}>
        <IconButton
          onClick={onFavourite}
          aria-label={`star ${video.title}`}
        >
          {video.isFavourite ? (
            <FavoriteIcon className={classes.title} />
          ) : (
            <FavoriteBorderIcon className={classes.title} />
          )}
          <span className={classes.description}>{video.like}</span>
        </IconButton>
        {video.title}
      </p>
    </div>
  );
};

VideoItem.propTypes = {
  className: PropTypes.string,
  onFavourite: PropTypes.func,
  video: PropTypes.object.isRequired
};

export default VideoItem;

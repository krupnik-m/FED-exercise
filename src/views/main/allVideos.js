import React from 'react';
import { Badge } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/styles';
import Slider from 'react-slick';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStores } from '../../contexts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles(() => ({
  root: {
  },
  slide: {
  },
  video: {
    width: '100%'
  },
  badge: {
    cursor: 'pointer',
    '&::after': {
      position: 'absolute',
      top: '20px',
      right: '20px'
    }
  }
}));

const AllVideos = ({ className, videos, ...rest }) => {
  const classes = useStyles();
  const { videoStore } = useStores();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    vertical: true,
    slidesToShow: 1,
    verticalSwiping: true,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {videos.length > 0 && (
        <Slider {...settings}>
          {videos.map(video => (
            <div className={classes.slide} key={video.id}>
              <h3>{video.title}</h3>
              <Badge
                className={classes.badge}
                onClick={() => videoStore.setFavourite(video.id)}
                overlap="rectangle"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                badgeContent={
                  video.isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
              >
                <video
                  className={classes.video}
                  poster={video.posterUrl}
                  preload="true"
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
              </Badge>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

AllVideos.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array.isRequired
};

export default AllVideos;

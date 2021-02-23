import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/styles';
import Slider from 'react-slick';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, Grid } from '@material-ui/core';
import { useStores } from '../../contexts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles(theme => ({
  root: {},
  video: {
    width: '100%'
  },
  slide: {
    position: 'relative'
  },
  like: {
    cursor: 'pointer',
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1)
  },
  videoTitle: {
    cursor: 'pointer',
    position: 'absolute',
    top: theme.spacing(1.5),
    left: '0',
    paddingLeft: theme.spacing(5),
    color: theme.palette.text.primary
  }
}));

const AllVideos = ({ className, videos, ...rest }) => {
  const classes = useStyles();
  const { videoStore } = useStores();
  let slider = null;

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

  const next = () => {
    slider.slickNext();
  };

  const previous = () => {
    slider.slickPrev();
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {videos.length > 0 && (
        <>
          {/* eslint-disable-next-line no-return-assign */}
          <Slider ref={c => (slider = c)} {...settings}>
            {videos.map(video => (
              <div className={classes.slide} key={video.id}>
                <video
                  className={classes.video}
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
                <h4 className={classes.videoTitle}>{video.title}</h4>
                <div
                  className={classes.like}
                  onClick={() => videoStore.setFavourite(video.id)}
                >
                  {video.isFavourite ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </div>
              </div>
            ))}
          </Slider>
          <Grid container justify="center" spacing={1} m={2}>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={previous}>
                Previous
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={next}>
                Next
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

AllVideos.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array.isRequired
};

export default AllVideos;

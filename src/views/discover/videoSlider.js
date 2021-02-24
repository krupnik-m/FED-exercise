import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Slider from 'react-slick';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStores } from '../../contexts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VideoItem from '../../components/VideoItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90vw',
    display: 'block',
    margin: '0 auto'
  },
  video: {
    width: 'auto',
    maxHeight: '25vh',
    display: 'inline-block'
  },
  slider: {
    backgroundColor: 'black',
    marginBottom: theme.spacing(3),
    width: '100%'
  },
  slide: {
    position: 'relative',
    backgroundColor: 'black',
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}));

const VideoSlider = ({ className, videos, ...rest }) => {
  const classes = useStyles();
  const { videoStore } = useStores();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {videos.length > 0 && (
      <Slider className={classes.slider} {...settings}>
        {videos.map(video => (
          <div className={classes.slide} key={video.id}>
            <VideoItem
              className={classes.video}
              onFavourite={() => videoStore.setFavourite(video.id)}
              video={video}
            />
          </div>
        ))}
      </Slider>
      )}
    </div>
  );
};

VideoSlider.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array.isRequired
};

export default VideoSlider;

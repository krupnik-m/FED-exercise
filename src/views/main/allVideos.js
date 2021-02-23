import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Slider from 'react-slick';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, Grid } from '@material-ui/core';
import { useStores } from '../../contexts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import textResources from '../../constants/textResources';
import VideoItem from '../../components/VideoItem';

const useStyles = makeStyles(theme => ({
  root: {
  },
  video: {
    width: '100%'
  },
  slider: {
    backgroundColor: 'black',
    marginBottom: theme.spacing(1),
  },
  slide: {
    position: 'relative',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

const text = textResources.mainPage;
let slider = null;

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
          <Slider className={classes.slider} ref={c => (slider = c)} {...settings}>
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
          <Grid container justify="center" spacing={1} m={2}>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={previous}>
                {text.previous}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={next}>
                {text.next}
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

import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

import Page from 'src/components/Page';
import { useStores } from '../../contexts';
import VideoSlider from './videoSlider';
import HorizontalVideoList from './horizontalVideoList';
import textResources from '../../constants/textResources';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2)
  },
  slideContainer: {}
}));

const text = textResources.discoverPage;

const DiscoverView = observer(() => {
  const classes = useStyles();
  const { videoStore } = useStores();
  const { allVideos, latestVideos, trendingVideos } = videoStore;
  const title = `${textResources.app.title} - ${textResources.navigation.discover}`;

  useEffect(() => {
    videoStore.getVideos();
  }, []);

  return (
    <Page
      className={classes.root}
      title={title}
    >
      <Container maxWidth={false}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid className={classes.slideContainer} item xs={12}>
            <VideoSlider videos={allVideos} />
          </Grid>
          <Grid item xs={12}>
            <HorizontalVideoList
              title={text.trendingVideo}
              videos={trendingVideos}
            />
          </Grid>
          <Grid item xs={12}>
            <HorizontalVideoList
              title={text.latestVideo}
              videos={latestVideos}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
});

export default DiscoverView;

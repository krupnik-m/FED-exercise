import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

import Page from 'src/components/Page';
import LikedVideos from './likedVideos';
import AllVideos from './allVideos';
import { useStores } from '../../contexts';
import textResources from '../../constants/textResources';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MainView = observer(() => {
  const classes = useStyles();
  const { videoStore } = useStores();
  const { allVideos, favouriteVideos } = videoStore;
  const title = `${textResources.app.title} - ${textResources.navigation.main}`;

  useEffect(() => {
    videoStore.getVideos();
  }, []);

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <LikedVideos videos={favouriteVideos} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <AllVideos videos={allVideos} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
});

export default MainView;

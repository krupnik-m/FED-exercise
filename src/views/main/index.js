import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import Page from 'src/components/Page';

import textResources from '../../constants/textResources';
import FavouriteVideos from './favouriteVideos';
import videoStore from '../../store/app-store';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100vw'
  }
}));

const MainView = observer(() => {
  const classes = useStyles();
  const { allVideos, favouriteVideos } = videoStore;
  const title = `${textResources.app.title} - ${textResources.navigation.main}`;

  useEffect(() => {
    videoStore.getVideos();
  }, []);

  return (
    <Page className={classes.root} title={title}>
      {allVideos.length > 0
      && <FavouriteVideos allVideos={allVideos} favouriteVideos={favouriteVideos} />}
    </Page>
  );
});

export default MainView;

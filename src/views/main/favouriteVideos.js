import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useStores } from '../../contexts';
import textResources from '../../constants/textResources';
import AllVideos from './allVideos';
import VideoItem from '../../components/VideoItem';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  tabs: {
    width: '50%',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  video: {
    width: '100%'
  },
  videoSlider: {
    width: '100%'
  },
  tabItem: {
    maxWidth: '100%',
  },
  tabSliderPanel: {
    maxWidth: '50%',
  },
  tabPanel: {
    padding: 24
  }
}));

const FavouriteVideos = ({ allVideos, favouriteVideos }) => {
  const classes = useStyles();
  const { videoStore } = useStores();
  const title = `${textResources.app.title} - ${textResources.navigation.main}`;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    videoStore.getVideos();
  }, []);

  return (
    <div className={classes.root} title={title}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          className={classes.tabItem}
          key={0}
          label="all video"
          {...a11yProps(0)}
        />
        {favouriteVideos.map((video, index) => (
          <Tab
            className={classes.tabItem}
            key={video.id}
            label={video.title}
            {...a11yProps(index + 1)}
          />
        ))}

      </Tabs>
      <div className={classes.tabSliderPanel} key="all-tab">
        {(value === 0)
      && (

        <div className={classes.tabPanel}>
          <AllVideos className={classes.videoSlider} videos={allVideos} />
        </div>

      )}
      </div>
      {favouriteVideos.map((video, index) => (
        <div key={`${video.id}-tab`}>
          {(value - 1 === index)
        && (
          <div className={classes.tabPanel}>
            <VideoItem
              className={classes.video}
              onFavourite={() => videoStore.setFavourite(video.id)}
              video={video}
            />
          </div>
        )}
        </div>
      ))}

    </div>
  );
};

FavouriteVideos.propTypes = {
  allVideos: PropTypes.array.isRequired,
  favouriteVideos: PropTypes.array
};

export default FavouriteVideos;

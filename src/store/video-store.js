import {
  observable,
  action,
  makeObservable,
  computed
} from 'mobx';
import { videoData } from '../constants/video.data';

const fedVideos = 'fedVideos';

export default class VideoStore {
  videos = [];

  /**
   * List of favourite videos
   * @type {[]}
   */
  get favouriteVideos() {
    return this.videos.filter(video => video.isFavourite);
  }

  /**
   * List of all videos
   * @type {[]}
   */
  get allVideos() {
    return this.videos;
  }

  /**
   * Getting video list from local storage
   * If there has not got any data,
   * than set default data from constants data
   */
  getVideos() {
    const value = localStorage.getItem(fedVideos);
    if (value !== null) {
      this.videos = JSON.parse(value);
    } else {
      this.setInitData();
    }
    console.log('videoId', this.videos);
  }

  /**
   * Setting default data from constants data
   */
  setInitData() {
    localStorage.setItem(fedVideos, JSON.stringify(videoData));
    this.videos = videoData;
  }

  storeVideos() {
    localStorage.setItem(fedVideos, JSON.stringify(this.videos));
  }

  /**
   * Add favourite video id to the favourite list
   */
  setFavourite(videoId) {
    console.log('-', videoId);
    this.videos = this.videos.map(video => {
      if (video.id === videoId) {
        console.log('found', video, video.isFavourite, !video.isFavourite);
        return { ...video, isFavourite: !video.isFavourite };
      }

      return video;
    });

    this.storeVideos();
  }

  constructor() {
    makeObservable(this, {
      videos: observable,
      allVideos: computed,
      favouriteVideos: computed,
      getVideos: action,
      setInitData: action,
      setFavourite: action
    });
  }
}

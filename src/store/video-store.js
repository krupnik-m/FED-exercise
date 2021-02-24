import {
  observable, action, makeObservable, computed
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
   * Sorted video's list by like's amount
   * @returns {[]}
   */
    get trendingVideos() {
      return this.videos.slice().sort((a, b) => (b.like - a.like));
    }

    /**
   * Sorted video's list by created date
   * @returns {[]}
   */
    get latestVideos() {
      return this.videos.slice().sort(
        (a, b) => (a.createdAt - b.createdAt)
      );
    }

    /**
   * Getting video list from local storage
   * If there has not got any data,
   * than set default data from constants data
   */
    getVideos() {
      const value = localStorage.getItem(fedVideos);
      if (value !== null) {
        const data = JSON.parse(value);
        this.videos = data.map(
          item => ({ ...item, createdAt: new Date(item.createdAt) })
        );
      } else {
        this.setInitData();
      }
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
      this.videos = this.videos.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            like: video.isFavourite ? (video.like - 1) : (video.like + 1),
            isFavourite: !video.isFavourite
          };
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
        trendingVideos: computed,
        latestVideos: computed,
        getVideos: action,
        setInitData: action,
        setFavourite: action
      });
    }
}

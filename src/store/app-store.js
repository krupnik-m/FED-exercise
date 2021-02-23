import VideoStore from './video-store';

export const createAppStore = () => {
  return {
    videoStore: new VideoStore()
  };
};

export default createAppStore;

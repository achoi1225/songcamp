import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = () => (
    <AudioPlayer
      autoPlay
      src="s3://songcamp-preloaded-audio/04 you should see me in a crown.m4a"
      onPlay={e => console.log("onPlay")}
      // other props here
    />
);

  export default Player;
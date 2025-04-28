import { useEvent } from 'expo';
import { useVideoPlayer, VideoView, TimeUpdateEventPayload } from 'expo-video';
import { StyleSheet, View, Image, TouchableOpacity, Pressable, Text } from 'react-native';
import { icons } from '@/constants/icons';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';


const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoPlayer = () => {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
      });
    
      const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
     

      {/* Volume Control */}
      const [volume, setVolume] = useState(1);
      const [muted, setMuted] = useState(false);

      const [currentTime, setCurrentTime] = useState(0);
      const [duration, setDuration] = useState(0);  // Changed from totalVideo
      const [isSliding, setIsSliding] = useState(false);

// Update useEffect for time tracking
useEffect(() => {
  if (!player) return;

  const listener = (event: TimeUpdateEventPayload) => {
    if (!isSliding) {
      // Use position instead of currentTime
      setCurrentTime(event.position);
      // Use seekableDuration instead of duration
      setDuration(event.seekableDuration);
      // Calculate progress
      setProgress(event.position / event.seekableDuration);
    }
  };

  player.addListener('timeUpdate', listener);
  
  // Set initial values if available
  if (player.seekableDuration) {
    setDuration(player.seekableDuration);
  }
  if (player.position) {
    setCurrentTime(player.position);
  }

  return () => {
    player.removeListener('timeUpdate', listener);
  };
}, [player, isSliding]);

// Update handleSeek for better seeking
const handleSeek = (value: number) => {
  if (player) {
    setIsSliding(true);
    // Use position property for seeking
    player.position = value;
    setCurrentTime(value);
    setIsSliding(false);
  }
};
       
      const toggleMute = () => {
        if (muted) {
          player.volume = volume;
          setMuted(false);
        } else {
          player.volume = 0;
          setMuted(true);
        }
      };


      const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
      


      const handleVolumeChange = (val: number) => {
        setVolume(val);
        player.volume = val;
        if (val === 0) {
          setMuted(true);
        } else {
          setMuted(false);
        }
      };
    
      


    return (  
<View>
    <View style={styles.container}>
      <View style={styles.videoWrapper} >
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen={true}
          allowsPictureInPicture
          nativeControls={false}
        />

        {!isPlaying && (
          <TouchableOpacity
            style={styles.customPlayButton}
            onPress={() => player.play()}
          >
            <Image
              source={icons.play} // Replace with your icon path
              style={styles.icon}
              resizeMode="contain"
              
            />
          </TouchableOpacity>
          
        )}
      </View>

      
    </View>
    
     
     {/*Controls*/}
     <View className="w-full bg-black px-4 py-2">
  <View className="flex-row items-center space-x-4">

    {/* Play/Pause */}
    <Pressable
      className="p-2 rounded-full"
      onPress={() => {
        if (isPlaying) {
          player.pause();
        } else {
          player.play();
        }
      }}
    >
      <Image
        source={isPlaying ? icons.pause : icons.play}
        className="w-5 h-5"
        resizeMode="contain"
      />
    </Pressable>

    {/* Volume */}
    <Pressable
      onPress={toggleMute}
      className="p-2 rounded-full"
    >
      <Image
        source={muted ? icons.mute : icons.volume}
        className="w-5 h-5"
        resizeMode="contain"
      />
    </Pressable>

    {/* Progress Bar */}
    <View className="flex-row items-center flex-1">
      <Text className="text-xs text-primary-500 w-10 text-right">
        {formatTime(currentTime)}
      </Text>

      <View className="flex-1">
        <Slider
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#a78bfa"
          maximumTrackTintColor="#444"
          thumbTintColor="#a78bfa"
          
        />
      </View>

      <Text className="text-xs text-primary-500 w-10 text-left">
        {formatTime(duration)}
      </Text>
    </View>
  </View>
</View>


</View>
      
  );
        
}

export default VideoPlayer

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    videoWrapper: {
      position: 'relative',
    },
    video: {
      width: 340,
      height: 275,
      borderRadius: 8,
      backgroundColor: '#000',
    },
    customPlayButton: {
      position: 'absolute',
      top: '45%',
      left: '45%',
      backgroundColor: 'rgba(30, 30, 30, 0.7)',
      padding: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#a78bfa',
    },
    icon: {
      width: 20,
      height: 20,
    },
  });
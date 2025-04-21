import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { icons } from '@/constants/icons';
import { useState } from 'react';

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


      const toggleMute = () => {
        if (muted) {
          player.volume = volume;
          setMuted(false);
        } else {
          player.volume = 0;
          setMuted(true);
        }
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
    <View className='flex-row mt-8 bg-transparent w-full'>
        
         {/*Play/Pause*/}
      <View >
         <Pressable
            className="absolute bottom-6 p-3 rounded-full"
            onPress={() => {
                if (isPlaying) {
                  player.pause();
                } else {
                  player.play();
                }
              }}>
                <Image
                  source={
                    isPlaying ? icons.pause : icons.play
                  }
                  className="w-6 h-6"
                  resizeMode="contain"
                  />
              
         </Pressable>
      </View>


        {/*Volume*/}

        <View>
            <Pressable onPress={toggleMute} className="p-2 rounded-full bg-transparent">

                <Image
                source={muted ? icons.mute : icons.volume}
                className="w-6 h-6"
                resizeMode='contain'
                />
            </Pressable> 
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
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { icons } from '@/constants/icons';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: any;
}

const LazyLoader = ({
  src,
  alt,
  className,
  placeholder = icons.loader,
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Start spinning when loading
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation(); // Stop spin when image is loaded
    }
  }, [isLoading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="relative">
      {isLoading && (
        <View className="absolute inset-0 flex-center">
          <Animated.Image
            source={placeholder}
            style={{
              width: 24,
              height: 24,
              transform: [{ rotate: spin }],
            }}
            resizeMode="contain"
          />
        </View>
      )}
      <Image
        source={{ uri: src }}
        accessibilityLabel={alt}
        onLoad={() => setIsLoading(false)}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </View>
  );
};

export default LazyLoader;

const styles = StyleSheet.create({});

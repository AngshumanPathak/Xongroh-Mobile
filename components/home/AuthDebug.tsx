import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useUserContext } from '../../context/AuthContext';

const AuthDebug = () => {
  const { 
    user, 
    isLoading, 
    isAuthenticated, 
    isVerified,
    checkAuthUser 
  } = useUserContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Debug Info</Text>
      
      <View style={styles.infoContainer}>
        <Text>Loading: {isLoading ? '✓' : '✗'}</Text>
        <Text>Authenticated: {isAuthenticated ? '✓' : '✗'}</Text>
        <Text>Verified: {isVerified ? '✓' : '✗'}</Text>
        <Text>User ID: {user.id || 'None'}</Text>
      </View>

      <Pressable 
        style={styles.button}
        onPress={() => checkAuthUser()}
      >
        <Text style={styles.buttonText}>Check Auth Status</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoContainer: {
    gap: 8,
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default AuthDebug;
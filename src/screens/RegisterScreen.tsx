import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Dimensions } from 'react-native';
import api from '../api';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [username, setUsername] = useState('');
const [error, setError] = useState<any>(null);

const handleRegister = async () => {
    try {
        await api.post('/auth/register', { email, password, username });
        navigation.navigate('Login');
    } catch (error: any) {
        setError(error.response.data.message);
    }
};

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 500;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    width: isSmallScreen ? '90%' : '50%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RegisterScreen;

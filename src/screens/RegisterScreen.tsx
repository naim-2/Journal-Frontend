import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../api';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [username, setUsername] = useState('');
const [error, setError] = useState<any>(null);

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const handleRegister = async () => {
    if (!email || !password || !username) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters.');
      return;
    }
    try {
        await api.post('/auth/register', { email, password, username });
        navigation.navigate('Login');
    } catch (error: any) {
        setError('Email or username already in use.');
    }
};

  return (
    <View style={styles.container}>
        <Icon name="book" size={100} color="gray" style={styles.icon} />
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
  icon: {
    alignSelf: 'center',
    marginBottom: 40,
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

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { RootState, AppDispatch } from '../store';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Journal'); 
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = () => {
    if (!email || !password) {
      setValidationError('Email and password are required.');
      return;
    }
    setValidationError(null);
    dispatch(login({ email, password }));
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
            {validationError && <Text style={styles.error}>{validationError}</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} disabled={loading} />
            <View style={{ width: 10 }} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: isSmallScreen ? '90%' : '50%',
  },
});

export default LoginScreen;

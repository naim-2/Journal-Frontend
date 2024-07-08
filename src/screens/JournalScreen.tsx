import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEntries, deleteEntry, updateUser } from '../store/journalSlice';
import { RootState, AppDispatch  } from '../store';
import moment from 'moment';

const JournalScreen = ({ navigation }: { navigation: any }) => {
  const dispatch: AppDispatch  = useDispatch();
  const { entries, loading, error } = useSelector((state: RootState) => state.journal);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);


  if (!entries) {
    return (
      <View style={styles.container}>
        <Text>No journal entries found.</Text>
      </View>
    );
  }

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  useEffect(() => {
    if (modalVisible) {
      setUsername('');
      setPassword('');
      setValidationError(null);
    }
  }, [modalVisible]);
  
  const handleDelete = (id: number) => {
    dispatch(deleteEntry(id));
  };

  const handleUpdateUser = () => {
    if(!username || !password){
      setValidationError('Username and password cannot be blank.');
      return;
    }
    dispatch(updateUser({ username, password }));
    setModalVisible(false);
  };

  const filteredEntries = categoryFilter === 'All'
    ? entries
    : entries.filter(entry => entry.category === categoryFilter);
  const entriesToday = categoryFilter === 'All'
    ? entries.filter(entry => moment(entry.date).isSame(new Date(), 'day')).length
    : entries.filter(entry => entry.category === categoryFilter && moment(entry.date).isSame(new Date(), 'day')).length;
  const totalEntries = categoryFilter === 'All'
    ? entries.length
    : entries.filter(entry => entry.category === categoryFilter).length;

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <Picker
        selectedValue={categoryFilter}
        onValueChange={(itemValue) => setCategoryFilter(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Personal" value="personal" />
        <Picker.Item label="Work" value="work" />
        <Picker.Item label="Travel" value="travel" />
      </Picker>
      <View style={styles.stats_user}>
        <Text>Today: {entriesToday}</Text>
        <Text>Total: {totalEntries}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id?.toString() ?? ''}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>

            <View style={styles.buttonContainer}>
              <Button title="Edit" color="green" onPress={() => navigation.navigate('EditEntry', { id: item.id })} />
              <View style={{ width: 10 }} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
      <Button title="Add New Entry" onPress={() => navigation.navigate('NewEntry')} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Update User Information</Text>
          <TextInput
            placeholder="New Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {validationError && <Text style={styles.error}>{validationError}</Text>}
          <View style={styles.buttonContainer}>
            <Button title="Update" color="green" onPress={handleUpdateUser} />
            <View style={{ width: 10 }} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>  
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  entry: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  stats_user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '99%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    marginTop: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default JournalScreen;

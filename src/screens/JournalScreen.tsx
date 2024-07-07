import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { getEntries, deleteEntry } from '../store/journalSlice';
import { RootState, AppDispatch  } from '../store';
import moment from 'moment';

const JournalScreen = ({ navigation }: { navigation: any }) => {
  const dispatch: AppDispatch  = useDispatch();
  const { entries, loading, error } = useSelector((state: RootState) => state.journal);
  const [categoryFilter, setCategoryFilter] = useState('All');

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

  const handleDelete = (id: number) => {
    dispatch(deleteEntry(id));
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
      <View style={styles.stats}>
        <Text>Today: {entriesToday}</Text>
        <Text>Total: {totalEntries}</Text>
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
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default JournalScreen;

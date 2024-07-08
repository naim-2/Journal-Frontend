import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addEntry } from '../store/journalSlice';

const NewEntryScreen = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch();

  const handleAddEntry = () => {
    if (!title || !content) {
      setError('Title and content cannot be blank.');
      return;
    }
    const date = new Date().toISOString().split('T')[0];
    dispatch(addEntry({ title, content, category, date }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Date"
        value={new Date().toISOString().split('T')[0]}
        editable={false}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue: string) => setCategory(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Personal" value="personal" />
          <Picker.Item label="Work" value="work" />
          <Picker.Item label="Travel" value="travel" />
        </Picker>
      </View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Add Entry" onPress={handleAddEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  left :{
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default NewEntryScreen;

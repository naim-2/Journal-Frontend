import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateEntry } from '../store/journalSlice';

const EditEntryScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { id } = route.params;
  const dispatch: AppDispatch = useDispatch();
  const entry = useSelector((state: RootState) => state.journal.entries.find(e => e.id === id));

  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  const [category, setCategory] = useState(entry?.category || '');
  const [date, setDate] = useState(entry?.date || '');

  const handleUpdateEntry = () => {
    dispatch(updateEntry({ id, title, content, category, date }));
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
      <Button title="Update Entry" onPress={handleUpdateEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default EditEntryScreen;

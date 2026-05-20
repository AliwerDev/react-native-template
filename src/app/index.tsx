import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      { id: Date.now().toString(), text, done: false },
      ...prev,
    ]);
    setInput('');
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Todos
        </ThemedText>

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addTodo}
            placeholder="What needs doing?"
            placeholderTextColor="#888"
            style={styles.input}
            returnKeyType="done"
          />
          <Pressable onPress={addTodo} style={styles.addButton}>
            <ThemedText type="smallBold">Add</ThemedText>
          </Pressable>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <ThemedText type="small" style={styles.empty}>
              No todos yet
            </ThemedText>
          }
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable
                onPress={() => toggleTodo(item.id)}
                style={styles.rowText}
              >
                <ThemedText
                  style={item.done ? styles.doneText : undefined}
                >
                  {item.done ? '✓ ' : '○ '}
                  {item.text}
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => removeTodo(item.id)}
                style={styles.removeButton}
              >
                <ThemedText type="small">✕</ThemedText>
              </Pressable>
            </View>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  title: {
    marginTop: Spacing.three,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    color: '#fff',
  },
  addButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#888',
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
  rowText: {
    flex: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  removeButton: {
    paddingHorizontal: Spacing.two,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.four,
  },
});

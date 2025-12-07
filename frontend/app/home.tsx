import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Alert,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  createTask,
  getTasksByUser,
  deleteTask,
  updateTaskStatus,
} from "../service/TaskApi";
import { useAuthStore } from "../store/authStore";
import { Task } from "../type/Task";

export default function Home() {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "done">("pending");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Charger les tâches quand user est dispo
  useEffect(() => {
    if (user?.id) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const data = await getTasksByUser(Number(user!.id));
      setTasks(data.tasks || data);
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", "Impossible de récupérer les tâches");
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) return Alert.alert("Erreur", "Veuillez entrer un titre");

    try {
      const newTask = await createTask({
        title,
        description,
        status,
        due_date: dueDate.toISOString(),
      });
      setTasks([newTask, ...tasks]);
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate(new Date());
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", "Impossible de créer la tâche");
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", "Impossible de supprimer la tâche");
    }
  };

  const toggleStatus = async (task: Task) => {
    try {
      const updated = await updateTaskStatus(
        task.id,
        task.status === "pending" ? "done" : "pending"
      );
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
      Alert.alert("Erreur", "Impossible de changer le statut");
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <Animated.View
      style={[
        styles.taskContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.status === "done" && styles.done]}>
          {item.title}
        </Text>
        <Text style={styles.taskDesc}>
          {item.description || "Pas de description"}
        </Text>
        <Text style={styles.taskDate}>
          {item.due_date
            ? new Date(item.due_date).toLocaleDateString()
            : "Date non définie"}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#28a745" }]}
          onPress={() => toggleStatus(item)}
        >
          <Text style={styles.buttonText}>
            {item.status === "done" ? "Annuler" : "Terminer"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#dc3545" }]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes Tâches</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Titre"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            Date limite: {dueDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDueDate(selectedDate);
            }}
          />
        )}
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "pending" && styles.activeStatus,
          ]}
          onPress={() => setStatus("pending")}
        >
          <Text style={styles.statusText}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "done" && styles.activeStatus,
          ]}
          onPress={() => setStatus("done")}
        >
          <Text style={styles.statusText}>Done</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Ajouter la tâche</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f2f5" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
  inputContainer: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  dateButton: {
    backgroundColor: "#17a2b8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  dateButtonText: { color: "#fff", fontWeight: "bold" },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007bff",
    alignItems: "center",
  },
  activeStatus: { backgroundColor: "#007bff" },
  statusText: { color: "#fff", fontWeight: "bold" },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  taskText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  taskDesc: { fontSize: 14, color: "#555", marginTop: 4 },
  taskDate: { fontSize: 12, color: "#666", marginTop: 4 },
  done: { textDecorationLine: "line-through", color: "#155724" },
  buttonsContainer: { flexDirection: "row", gap: 8 },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

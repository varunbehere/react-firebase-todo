import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

async function addTodo(todo) {
  try {
    await addDoc(collection(db, "todos"), todo);
    alert("Added Todo!");
  } catch (error) {
    alert(error.message);
  }
}
async function readTodos() {
  try {
    const response = await getDocs(collection(db, "todos"));
    const todos = [];
    response.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    return todos;
  } catch (error) {
    alert(error.message);
  }
}
async function updateTodo(id, updates) {
  try {
    await updateDoc(doc(db, "todos", id), updates);
    alert("Todo updated successfully!");
  } catch (error) {
    alert(error.message);
  }
}
async function deleteTodo(id) {
  try {
    await deleteDoc(doc(db, "todos", id));
    alert("Todo deleted successfully!");
  } catch (error) {
    alert(error.message);
  }
}

export { addTodo, readTodos, deleteTodo, updateTodo };

import React, { useEffect, useState } from "react";
import Header from "./Header";
import { RiAddFill } from "react-icons/ri";
import TodoComponent from "./TodoComponent";
import { IoMdSave } from "react-icons/io";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import { addTodo, readTodos } from "./FirebaseFunctions";

function Home() {
  const [todos, setAppTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const todosCollection = collection(db, "todos");
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      console.log(snapshot);
      const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppTodos(todos);
    });

    return () => unsubscribe();
  }, []);

  async function onSaveHandler() {
    if (!todoText.trim()) {
      alert("Todo cannot be empty!");
      return;
    }

    const newlyCreatedTodo = {
      text: todoText,
      createdOn: new Date().toLocaleDateString("en-GB"),
      isEdited: false,
      editedOn: null,
      isCompleted: false,
      completedOn: null,
    };
    try {
      const newlyAddedDocId = await addTodo(newlyCreatedTodo);
      const newlyCreatedTodoWithId = {
        id: newlyAddedDocId,
        ...newlyCreatedTodo,
      };
      setTodoText("");
      setIsCreating(false);
    } catch (error) {
      console.log();
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-300 font-mono">
      <Header />
      <div className="w-full min-h-screen pt-18 pr-5 pl-5 pb-5">
        <div className="border-b-2 border-gray-400 pb-5">
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="flex flex-row justify-center items-center text-md bg-white font-semibold mt-2 px-5 py-3 rounded-md shadow-lg"
            >
              <RiAddFill className="text-2xl mr-3" /> Create Todo
            </button>
          ) : (
            <div className="flex flex-row justify-between bg-white p-3 rounded-lg shadow-lg items-center">
              <input
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="w-full outline-b-1 outline-gray-200 bg-gray-100 focus:outline-none p-1 rounded-sm mr-2"
                onKeyDown={(e) => e.key === "Enter" && onSaveHandler()}
              />
              <button
                onClick={onSaveHandler}
                className="flex flex-row items-center space-x-3 p-1 justify-between bg-blue-400 rounded-sm"
              >
                <IoMdSave className="ml-2" />
                <span className="min-h-full flex items-center">Save</span>
              </button>
            </div>
          )}
        </div>
        <div className="pt-5 space-y-5">
          {todos && todos.map((todo) => <TodoComponent todo={todo} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;

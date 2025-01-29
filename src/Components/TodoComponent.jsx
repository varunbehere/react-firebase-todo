import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { updateTodo, deleteTodo } from "./FirebaseFunctions";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function TodoComponent({ todo }) {
  const [newTodo, setNewTodo] = useState(todo.text || "");
  const [isEditing, setIsEditing] = useState(false);

  async function onSaveHandler() {
    try {
      if (newTodo.trim() === "") {
        alert("Todo cannot be empty!");
        return;
      }
      await updateTodo(todo.id, {
        text: newTodo,
        isEdited: true,
        isEditedOn: new Date().toLocaleDateString("en-GB"),
      });
      setIsEditing(false);
    } catch (e) {
      console.log(error.message);
    }
  }

  async function onComplete() {
    try {
      await updateTodo(todo.id, {
        isCompleted: true,
        completedOn: new Date().toLocaleDateString("en-GB"),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-row justify-between bg-white p-3 rounded-lg shadow-lg items-center">
      <div className="w-full pr-3">
        <input
          readOnly={!isEditing}
          value={!isEditing ? todo.text : newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className={`w-full ${
            isEditing
              ? "outline-b-1 outline-gray-200 focus:outline-none"
              : `outline-none ${todo.isCompleted && "line-through"}`
          }`}
          onKeyDown={(e) => e.key === "Enter" && isEditing && onSaveHandler()}
        />
        {!isEditing && (
          <span className="flex flex-row space-x-5">
            <p className="text-xs text-gray-400">
              Created on: {todo.createdOn}
            </p>
            {todo.isCompleted && (
              <p className="text-xs text-gray-400">
                Completed on: {todo.completedOn}
              </p>
            )}
          </span>
        )}
      </div>
      <div className="flex flex-row space-x-3">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            disabled={todo.isCompleted}
            className={`flex flex-row items-center space-x-3 p-1 justify-between ${
              todo.isCompleted ? "bg-gray-300" : "bg-blue-400"
            } rounded-sm`}
          >
            <FiEdit2 className="ml-2" />
            <span className="min-h-full flex items-center">Edit</span>
          </button>
        ) : (
          <button
            onClick={onSaveHandler}
            className="flex flex-row items-center space-x-3 p-1 justify-between bg-blue-400 rounded-sm"
          >
            <IoMdSave className="ml-2" />
            <span className="min-h-full flex items-center">Save</span>
          </button>
        )}
        {!isEditing && (
          <>
            <button
              onClick={() => onComplete(todo.id)}
              disabled={todo.isCompleted}
              className={`flex flex-row items-center space-x-3 p-1 justify-between rounded-sm ${
                todo.isCompleted
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-400"
              }`}
            >
              <FiCheck className="ml-2" />
              <span className="min-h-full flex items-center">Done</span>
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="flex flex-row items-center space-x-3 p-1 text-white justify-between bg-red-500 rounded-sm"
            >
              <MdDelete className="ml-2" />
              <span className="min-h-full flex items-center">Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoComponent;

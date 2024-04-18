// Importing necessary dependencies and styles
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import "./Todo.css";

// Function to retrieve todos from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("todos");

  if (list) {
    return JSON.parse(localStorage.getItem("todos"));
  }
  return [];
};

// Main Todo component
const Todo = () => {
  // State variables for managing todos and input values
  const [todo, setTodo] = useState(""); // Input value for new todo
  const [todos, setTodos] = useState(getLocalItems()); // List of todos
  const [editedTodo, setEditedTodo] = useState(""); // ID of todo being edited
  const [editedText, setEditedText] = useState(""); // Text of edited todo

  // Function to add a new todo item
  const addTodo = (e) => {
    e.preventDefault();
    // Creating a new todo object and adding it to the todos list
    const newTodos = (prevTodos) => {
      return [
        ...prevTodos,
        {
          id: new Date().getTime(), // Unique ID based on current time
          todoText: todo, // Text content of the todo
          isCompleted: false, // Initial completion state
          ...todo,
        },
      ];
    };

    setTodos(newTodos);
    setTodo(""); // Clearing the input field after adding the todo
  };

  // Function to delete a todo item
  const deleteTodo = (id) => {
    // Filtering out the todo with the provided ID from the todos list
    const newTodos = (prevTodos) => prevTodos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Function to edit a todo item
  const editTodo = (e, id) => {
    e.preventDefault();
    // Updating the text of the todo with the provided ID
    const newTodos = [...todos].map((todo) => {
      if (id === todo.id) {
        todo.todoText = editedText;
      }
      return todo;
    });
    setTodos(newTodos);
    setEditedTodo(null); // Exiting edit mode after editing
  };

  // Function to toggle the completion state of a todo item
  const toggleTodoState = (id) => {
    // Toggling the completion state of the todo with the provided ID
    const newTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // Effect hook to log todos to the console whenever they change
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // Function to set focus on input element
  const setInputFocus = (input) => {
    if (input !== null) {
      input.focus();
    }
  };

  // Effect hook to save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // JSX for rendering the todo list
  return (
    <div className="todo-card">
      <div className="todos-wrapper">
        <h3 className="todo-heading">To-do-List📝</h3>
        {/* Form for adding new todos */}
        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            onChange={(e) => {
              setTodo(e.target.value);
              console.log(todo);
            }}
            value={todo}
            ref={setInputFocus}
          />
          <button type="submit" className="btn-add">
            Add +
          </button>
        </form>
        {/* Rendering existing todos */}
        {todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            {/* Edit mode */}
            {todo.id === editedTodo ? (
              <div className="todo-wrapper">
                <form onSubmit={(e) => editTodo(e, todo.id)}>
                  <input
                    type="text"
                    className="todo-input input-edit"
                    onChange={(e) => setEditedText(e.target.value)}
                    defaultValue={todo.todoText}
                    ref={setInputFocus}
                  />
                </form>
                <button
                  className="todo-controls cancel"
                  onClick={() => setEditedTodo("")}
                >
                  Cancel
                </button>
              </div>
            ) : (
              /* Display mode */
              <div className="todo-wrapper">
                <span
                  className={
                    "todo-text " + (todo.isCompleted === true && "completed")
                  }
                >
                  {todo.todoText}
                </span>
                <div className="todo-controls">
                  {/* Checkbox for toggling completion state */}
                  {todo.isCompleted === true ? (
                    <ImCheckboxChecked
                      onClick={() => toggleTodoState(todo.id)}
                    />
                  ) : (
                    <ImCheckboxUnchecked
                      onClick={() => toggleTodoState(todo.id)}
                    />
                  )}
                  {/* Delete button */}
                  <RiDeleteBin6Line onClick={() => deleteTodo(todo.id)} />
                  {/* Edit button */}
                  <AiFillEdit onClick={() => setEditedTodo(todo.id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;

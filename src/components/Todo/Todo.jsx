import { useState } from "react";
import TodoList from "../TodoList/TodoList";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingTodo, setCurrentEditingTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handleAddTodo = () => {
    if (inputValue !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          isCompleted: false,
        },
      ]);
    }
    setInputValue("");
  };

  const handleEditTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: newText,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button onClick={handleAddTodo}>Add</button>
      {/* Display todos */}
      <h1>Pending Todos</h1>
      {todos.map((todo) => {
        if (!todo.isCompleted) {
          return (
            <div key={todo.id}>
              {isEditing && currentEditingTodo === todo.id ? (
                <input
                  type="text"
                  onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                  defaultValue={todo.text}
                />
              ) : (
                <p>{todo.text}</p>
              )}
              <button onClick={() => {
                setCurrentEditingTodo(todo.id);
                setIsEditing(!isEditing);
              }}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleToggleTodo(todo.id)}>
                Set Complete
              </button>
            </div>
          );
        }
      })}
      <h1>Completed Todos</h1>
      {todos.map((todo) => {
        if (todo.isCompleted) {
          return (
            <div key={todo.id}>
              <p>{todo.text}</p>
              <button
                onClick={() =>
                  handleEditTodo(todo.id, prompt("Enter New Text", todo.text))
                }
              >
                Edit
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleToggleTodo(todo.id)}>
                Set Pending
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Todo;

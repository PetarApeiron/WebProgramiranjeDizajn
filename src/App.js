import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/Todolist";
import Login from "./components/Login";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
  const checkIfLoggedIn = () => {
    let value = getCookieValue("user");
    if (value === "petar") {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    filterHandler();
    checkIfLoggedIn();
  }, [todos, status]);
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const handleLogin = (e, username, password) => {
    e.preventDefault();
    if (username === "petar" && password === "petar") {
      setIsLoggedIn(true);
      document.cookie = "user=petar";
    }
  };
  if (!isLoggedIn) return <Login handleLogin={handleLogin} />;
  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            document.cookie = "user=";
          }}
        >
          Logout
        </button>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        setStatus={setStatus}
      ></Form>
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      ></TodoList>
    </div>
  );
}

export default App;

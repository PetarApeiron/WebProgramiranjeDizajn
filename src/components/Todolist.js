import React from "react";
import Todo from "./Todo";
const TodoList = ({ todos, setTodos, filteredTodos }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            setTodos={setTodos}
            key={todo.id}
            text={todo.text}
            id={todo.id}
            todos={todos}
            completed={todo.completed}
          ></Todo>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

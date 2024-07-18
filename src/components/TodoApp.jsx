import React, { useState, useEffect } from 'react';



const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Retrieve todo list from local storage on component mount
  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];
    setTodoList(savedTodoList);
  }, []);

  // Save todo list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (userInput.trim() === '') {
      alert('Enter Valid Text');
      return;
    }
    const newTodo = {
      text: userInput,
      uniqueNo: todoList.length + 1,
      isChecked: false,
    };
    setTodoList([...todoList, newTodo]);
    setUserInput('');
  };

  // Handle changing the status of a todo
  const handleStatusChange = (uniqueNo) => {
    const updatedTodos = todoList.map((todo) =>
      todo.uniqueNo === uniqueNo ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodoList(updatedTodos);
  };

  // Handle deleting a todo
  const handleDeleteTodo = (uniqueNo) => {
    const updatedTodos = todoList.filter((todo) => todo.uniqueNo !== uniqueNo);
    setTodoList(updatedTodos);
  };

  return (
    <div className="todo-app-container">
      <h1>Todos Application</h1>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Add a new task"
          className="todo-user-input"
        />
        <button onClick={handleAddTodo} className="button">Add</button>
      </div>
      <ol className="todo-items-container">
        {todoList.map((todo) => (
          <li key={todo.uniqueNo} className="todo-item-container d-flex flex-row">
            <input
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => handleStatusChange(todo.uniqueNo)}
              className="checkbox-input"
            />
            <div className="label-container d-flex flex-row">
              <label
                htmlFor={`checkbox${todo.uniqueNo}`}
                className={`checkbox-label ${todo.isChecked ? 'checked' : ''}`}
              >
                {todo.text}
              </label>
              
              <div className="delete-icon-container">
                <i
                  className="far fa-trash-alt delete-icon"
                  onClick={() => handleDeleteTodo(todo.uniqueNo)}
                ></i>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodoApp;

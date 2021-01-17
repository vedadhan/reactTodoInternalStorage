import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList';


function App() {

    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
      getLocalTodos();
    },[]);

    useEffect(() => {

      const filterHandler = () => {
        switch(status){
          case 'completed':
            setFilteredTodos(todos.filter(todo => todo.completed === true));
            break;
          case 'uncompleted':
            setFilteredTodos(todos.filter(todo => todo.completed === false));
            break;
          default:
            setFilteredTodos(todos);
            break;
        }
      };

      filterHandler();
      saveLocalTodos();
    }, [todos, status]);

    const saveLocalTodos = () => {
       localStorage.setItem('todos',JSON.stringify(todos));
     
    };

    const getLocalTodos = () => {
      if(localStorage.getItem("todos") === null){
        localStorage.setItem('todos', JSON.stringify([]));
      }else{
        let storageLocal = JSON.parse(localStorage.getItem('todos')); 
        setTodos(storageLocal);
      }
    };

    return (
      <div className="App">
        <header>
          <h2>TODO List</h2>

        </header>
          <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
          <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
      </div>
    );
  }


export default App;

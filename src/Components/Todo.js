import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import {
  addTodo,
  removoTodo,
  updateTodo,
  completedTodo,
  setFilter,
} from '../Redux/TodoReducer';
import '../Css/TodoStyles.css';

const Todo = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const { value, filter } = useSelector((state) => state.todos);
  //   console.log(value);
  //   console.log(filter, 'filtering ');

  // FILTERING COMPLETED AND ALL AND ACTIVE TODOS FUNCTIONS......

  const filteredTodos = value.filter((todos) => {
    if (filter === 'active') {
      // ! RETURN COMPLETE VALUE WHAT VALUES IS FALSE RETURN
      return !todos.completed;
    } else if (filter === 'completed') {
      // RETURN WHAT VALUE IS TRUE
      return todos.completed;
    } else {
      return value;
    }
  });

  // FIND OUT PARTICULAR TODOS USING FIND METHOD HELPED THROUGH THE USESELECTOR HOOKS....
  const particularTodo = useSelector((state) =>
    currentId ? state.todos.value.find((p) => p.id === currentId) : null
  );

  useEffect(() => {
    if (particularTodo) {
      setTodo(particularTodo.todo);
    }
  }, [particularTodo]);

  const addButtonTodo = () => {
    dispatch(
      addTodo({
        todo,
        id: Math.floor(Math.random() * 1000),
        completed: false,
      })
    );
    setTodo([]);
  };

  const updateButtonTodo = () => {
    dispatch(
      updateTodo({
        todo,
        id: currentId,
        completed: false,
      })
    );
    setTodo([]);
    if (currentId !== null) {
      setCurrentId(null);
    }
  };

  const completeButtonTodo = (id) => {
    dispatch(completedTodo(id));
  };

  const removeButtonTodo = (id) => {
    dispatch(removoTodo(id));
  };

  return (
    <div className='todo'>
      <div className='todo-header'>
        <input
          type='text'
          placeholder='Add a New Todo'
          className='todo-header-input'
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        {currentId ? (
          <button
            onClick={updateButtonTodo}
            className='todo-header-update-button'
          >
            Update
          </button>
        ) : (
          <button onClick={addButtonTodo} className='todo-header-add-button'>
            Add
          </button>
        )}
      </div>
      <div className='todo-active'>
        <button
          className='todo-active-all-button'
          onClick={() => {
            dispatch(setFilter('All'));
          }}
        >
          All
        </button>
        <button
          className='todo-active-completed-button'
          onClick={() => {
            dispatch(setFilter('completed'));
          }}
        >
          Completed
        </button>
        <button
          className='todo-active-active-button'
          onClick={() => {
            dispatch(setFilter('active'));
          }}
        >
          Active
        </button>
      </div>
      <div className='todo-items'>
        <ul className='todo-items-ul'>
          {filteredTodos.map((todo) => {
            return (
              <li key={todo.id} className='todo-items-ul-li'>
                {/* {todo.todo} */}
                {/* Strike out process if completed todo list  */}
                {todo.completed ? <del>{todo.todo}</del> : <>{todo.todo}</>}
                <button
                  className='todo-items-ul-li-edit-button'
                  onClick={() => {
                    setCurrentId(todo.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className='todo-items-ul-li-completed-button'
                  onClick={() => {
                    completeButtonTodo(todo.id);
                  }}
                >
                  Completed
                </button>
                <button
                  className='todo-items-ul-li-delete-button'
                  onClick={() => {
                    removeButtonTodo(todo.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

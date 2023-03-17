import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo-reducer',
  initialState: {
    value: [],
    filter: 'all',
  },

  reducers: {
    addTodo: (state, action) => {
      //   console.log(state, 'this to do state');
      state.value.push(action.payload);
    },
    removoTodo: (state, action) => {
      //   console.log(action.payload, 'REMOVE');
      state.value = state.value.filter((values) => {
        return values.id !== action.payload;
      });
    },
    updateTodo: (state, action) => {
      //   console.log(action.payload.id, 'reducersss');
      const updatePost = state.value.findIndex((todo) => {
        return todo.id === action.payload.id;
      });
      //   console.log(updatePost, 'reducersupdate');
      // updatepost return two values matched means 0 not mathched means -1
      if (updatePost >= 0) {
        // [updatepost] means your index value.... 0 , 1, 2, 3 like this
        state.value[updatePost] = action.payload;
      }
    },
    completedTodo: (state, action) => {
      const completedTrue = state.value.find((todo) => {
        return todo.id === action.payload;
      });
      //   console.log(completedTrue, 'COMPLETED');
      if (completedTrue) {
        completedTrue.completed = true;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, removoTodo, updateTodo, completedTodo, setFilter } =
  todoSlice.actions;

export default todoSlice.reducer;

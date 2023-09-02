import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../reducers/todos";
const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export default store;
// export { history };

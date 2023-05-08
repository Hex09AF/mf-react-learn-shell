import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "example",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const staticReducers = {
  example: exampleSlice.reducer,
};

function createReducer(asyncReducers?: any): any {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

export default function configureAppStore(preloadState?: Record<string, any>) {
  const store = configureStore({
    reducer: staticReducers,
  });

  store.asyncReducers = {};

  store.injectReducer = (key: string, asyncReducer: Reducer) => {
    if (store.asyncReducers) {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(createReducer(store.asyncReducers));
    }
  };

  // Return the modified store
  return store;
}

export const store = configureAppStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const { increment, decrement, incrementByAmount } = exampleSlice.actions;
export const selectCount = (state: RootState) => state.example.value;

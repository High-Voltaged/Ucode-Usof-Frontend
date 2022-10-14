const rejectWithError = (reject, error) => {
  if (error.response && error.response.data.message) {
    return reject(error.response.data.message);
  } else {
    return reject(error.message);
  }
};

const addReducerCases = (builder, thunk, loading = true) => {
  builder
    .addCase(thunk.pending, (state, _action) => {
      if (loading) {
        state.loading = true;
      }
      state.error = "";
    })
    .addCase(thunk.fulfilled, (state, _action) => {
      if (loading) {
        state.loading = false;
      }
      state.error = "";
    })
    .addCase(thunk.rejected, (state, action) => {
      if (loading) {
        state.loading = false;
      }
      state.error = action.payload;
    });
};

export { rejectWithError, addReducerCases };

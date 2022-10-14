const rejectWithError = (reject, error) => {
  return reject(error.response.data.message);
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

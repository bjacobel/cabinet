export const UPDATE_FILTER = 'UPDATE_FILTER';

export const updateFilterTerm = (filterTerm) => {
  return { type: UPDATE_FILTER, payload: { filterTerm } };
};

export const updateFilterTermAsync = (filterTerm) => {
  return (dispatch) => {
    dispatch(updateFilterTerm(filterTerm));
  };
};

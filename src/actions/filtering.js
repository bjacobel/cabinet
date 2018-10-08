export const UPDATE_FILTER = 'UPDATE_FILTER';

export const updateFilterTerm = (filterTerm) => ({ type: UPDATE_FILTER, payload: { filterTerm } });

export const updateFilterTermAsync = (filterTerm) => (dispatch) => {
  dispatch(updateFilterTerm(filterTerm));
};

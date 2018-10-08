import { UPDATE_FILTER } from '../actions/filtering';

export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return action.payload.filterTerm;
    default:
      return state;
  }
};

import { GET_SENATORS_SUCCEEDED } from '../actions/cabinet';

export default (state = [], action) => {
  switch (action.type) {
  case GET_SENATORS_SUCCEEDED:
    return action.payload.senators;
  default:
    return state;
  }
};

import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Reducer that handles messages from the current group
 *
 * @param {Object} state - initial state
 * @param {Object} action - the dispatched action
 *
 * @returns {Object} new state of the messages section of the store
 */
const selectedGroupReducer = (state = initialState.selectedGroup, action) => {
  switch (action.type) {
    case types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        groupId: action.id,
        groupMessages: action.data
      };

    case types.GET_MESSAGES_FAILURE:
      return state;

    case types.GET_GROUP_SUCCESS:
      return {
        ...state,
        groupName: action.group.name,
      };

    case types.GET_GROUP_FAILURE:
      return {
        ...state,
        groupName: '',
      };

    case types.POST_MESSAGE_SUCCESS:
      return {
        ...state,
        groupMessages: [...state.groupMessages, action.message]
      };

    case types.POST_MESSAGE_FAILURE:
      return state;

    case types.EDIT_GROUP_SUCCESS:
      return { ...state, groupName: action.group.name };

    case types.EDIT_GROUP_FAILURE:
      return state;

    case types.EDIT_GROUP_ON:
      return { ...state, editGroupStatus: true };

    case types.EDIT_GROUP_OFF:
      return { ...state, editGroupStatus: false };

    default:
      return state;
  }
};

export default selectedGroupReducer;

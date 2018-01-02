import { isEmpty, trim } from 'lodash';
import validator from 'validator';

/**
 * Validates signup input
 *
 * @param {Object} state
 *
 * @returns {Object} returns errors if any and the validity status of the input
 */
const validateSignupInput = (state) => {
  const errors = {};
  const len = state.username.length;

  if (trim(state.email).length === 0) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(state.email)) {
    errors.email = 'Email is Invalid';
  }

  if (trim(state.username).length === 0) {
    errors.username = 'Username is required';
  } else if (trim(state.username).length < 5) {
    errors.username = 'Username is too short (min of 5 characters).';
  } else if (state.username.charAt(0) === ' ') {
    errors.username = 'Username cannot begin with space characters';
  } else if (state.username.charAt(len - 1) === ' ') {
    errors.username = 'Username cannot end with space characters';
  }

  if (state.password.length === 0) {
    errors.password = 'Password is required';
  } else if (state.password.length < 8) {
    errors.password = 'Password is too short (min of 8 characters).';
  }

  if (state.confirmPassword !== state.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * Validates login input
 *
 * @param {Object} state
 *
 * @returns {Object} returns errors if any and the validity status of the input
 */
const validateLoginInput = (state) => {
  const errors = {};

  if (trim(state.username).length === 0) {
    errors.username = 'Please provide a username';
  }

  if (state.password.length === 0) {
    errors.password = 'Please provide a password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * Validates input when creating new group
 *
 * @param {Object} state
 *
 * @returns {Object} returns errors if any and the validity status of the input
 */
const validateGroupInput = (state) => {
  const errors = {};
  const len = state.name.length;

  if (trim(state.name).length === 0) {
    errors.name = 'Group Name is required';
  } else if (trim(state.name).length < 5) {
    errors.name = 'Group Name is too short (min of 5 characters).';
  } else if (state.name.charAt(0) === ' ') {
    errors.name = 'Group Name cannot begin with a space character';
  } else if (state.name.charAt(len - 1) === ' ') {
    errors.name = 'Group Name cannot end with a space character';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * Validates message input
 *
 * @param {Object} state
 *
 * @returns {Object} returns errors if any and the validity status of the input
 */
const validateMessageInput = (state) => {
  const errors = {};

  if (trim(state.content).length === 0) {
    errors.message = 'Message cannot be empty';
  }

  if (trim(state.priority).length === 0) {
    errors.priority = 'Please include a priority';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * Validates input when filling forgot password form
 *
 * @param {Object} state
 *
 * @returns {Object} contains boolean indicating validity status of the input
 */
const validateForgotPasswordEmail = (state) => {
  const errors = {};

  if (trim(state.email).length === 0) {
    errors.email = 'Email is empty';
  } else if (!validator.isEmail(state.email)) {
    errors.email = 'Email is Invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 * validates new password when resetting password
 *
 * @param {Object} state
 *
 * @returns {Object} returns errors if any and the validity status of the input
 */
const validateNewPassword = (state) => {
  const errors = {};

  if (trim(state.password).length === 0) {
    errors.password = 'Password is required';
  } else if (state.password.length < 8) {
    errors.password = 'Password is too short (min of 8 characters).';
  }

  if (state.confirmPassword !== state.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export {
  validateSignupInput, validateLoginInput,
  validateGroupInput, validateMessageInput,
  validateForgotPasswordEmail, validateNewPassword
};

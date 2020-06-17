const deepCopy = (state) => {
  let copiedState, value, key;

  if (typeof state !== "object" || state === null) {
    return state;
  }

  copiedState = Array.isArray(state) ? [] : {};

  for (key in state) {
    value = state[key];
    copiedState[key] = deepCopy(value);
  }

  return copiedState;
}

export default deepCopy;
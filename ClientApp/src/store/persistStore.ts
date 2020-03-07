/**
 * Gets object of type T from local storage
 * @param {string} key - The key the object is saved in the storage under
 * @returns {T | undefined} Returns object of type T if found, undefined otherwise
 */
export const getFromLocalState = <T extends any>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if(serializedState) {
      console.log("Retrieving state from local storage under key \"" + key + "\"")
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error(error)
  }
  return undefined;
}

/**
 * Serializes the object and then saves that into local storage 
 * @param {string} key - The key to save the state in the storage under
 * @param {T} state - The state to save into local storage
 * @returns {boolean} Returns true if successful
 */
export const saveToLocalState =  <T extends any>(key: string, state: T): boolean => {
  let success = false;
  try {
    const serializedState = JSON.stringify(state); 
    localStorage.setItem(key, serializedState);
    success = true;
    console.log("Saving state to local storage under key \"" + key + "\"")
  } catch (error) {
    console.error(error)
  }
  return success;
}

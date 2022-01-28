const initialValue = [];

const filePageFolderTreeReducer = (state = initialValue, action) => {
  if (action.type === "filePageFolderTree") {
    return [...state, action.payload];
  }
  return state;
};

export default filePageFolderTreeReducer;

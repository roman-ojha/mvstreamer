const initialState = [];

const homePageSongsDetail = (state = initialState, action) => {
  if (action.type === "homePageSongsDetail") {
    return action.payload;
  } else {
    return state;
  }
};

export default homePageSongsDetail;

import { deleteTagFetch, fetchMainData, fetchTagInfo } from "../api";

const initialState = {
  search_pending: false,
  hash_tag_list: []
};

const hashtags = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TAG_LIST":
      return {
        ...state,
        hash_tag_list: payload,
        pending: false
      };
    case "ADD_TAG":
      return {
        ...state,
        search_pending: false,
        hash_tag_list: [
          payload,
          ...state.hash_tag_list.filter(tag => payload.id !== tag.id)
        ]
      };
    case "PENDING":
      return {
        ...state,
        pending: true
      };
    case "SEARCH_PENDING":
      return {
        ...state,
        search_pending: true
      };
    case "REFRESH_TAG":
      return {
        ...state,
        hash_tag_list: [
          ...state.hash_tag_list.filter(tag => tag.id !== payload.id),
          payload
        ].sort((a, b) => b.id - a.id)
      };
    case "DELETE_TAG":
      return {
        ...state,
        hash_tag_list: state.hash_tag_list.filter(tag => tag.id !== payload)
      };
    case "OK":
      return {
        ...state,
        pending: false,
        search_pending: false
      };
    default:
      return state;
  }
};

const addTag = tag => ({ type: "ADD_TAG", payload: tag });
const addTagList = tagList => ({
  type: "ADD_TAG_LIST",
  payload: tagList
});
const deleteTag = tagId => ({ type: "DELETE_TAG", payload: tagId });
const setSearchPending = () => ({ type: "SEARCH_PENDING" });
const setOk = () => ({ type: "OK" });
export const refreshTag = tag => ({ type: "REFRESH_TAG", payload: tag });

//actions
export const deleteTagAction = tagId => dispatch => {
  return deleteTagFetch(tagId).then(data => {
    console.log(data);
    dispatch(deleteTag(tagId));
  });
};

export const addTagAction = tagQ => dispatch => {
  dispatch(setSearchPending());
  return fetchTagInfo(tagQ).then(data => {
    console.log(data);
    const { hashTag } = data.data;
    if (hashTag) dispatch(addTag(hashTag));
    else {
      dispatch(setOk());
      alert("없는태그입니다.");
    }
  });
};

export const addTagListAction = () => dispatch => {
  dispatch({ type: "PENDING" });
  return fetchMainData().then(data => {
    dispatch(addTagList(data.data));
  });
};

export default hashtags;

import { Post, FilterByPosts, Action } from "types";

interface PostState {
  baseUrl: string;
  posts: Post[] | null;
  filterByPosts: FilterByPosts | null;
  currPage: string | null;
  pageNumber: number;
  isPostsLoading: boolean;
  postsLength: number | null;
}



// Initialize state
const INITIAL_STATE: PostState = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3030/',
  posts: null,
  filterByPosts: null,
  currPage: null,
  pageNumber: 1,
  isPostsLoading: false,
  postsLength: null,
};

// Reducer function
export function postReducer(state: PostState = INITIAL_STATE, action: Action): PostState {
  switch (action.type) {
    case 'SET_CURR_PAGE':
      return {
        ...state,
        currPage: action.page,
      };
    case 'SET_NEXT_PAGE':
      return {
        ...state,
        pageNumber: action.page ? action.page : state.pageNumber + 1,
      };
    case 'SET_IS_POSTS_LOADING':
      return {
        ...state,
        isPostsLoading: action.isLoading,
      };
    case 'SET_POSTS_LENGTH':
      return {
        ...state,
        postsLength: action.postsLength,
      };
    case 'ADD_FILTER_BY_POSTS':
      return {
        ...state,
        filterByPosts: { ...state.filterByPosts, ...action.filterByPosts },
      };
    case 'SET_FILTER_BY_POSTS':
      return {
        ...state,
        filterByPosts: action.filterByPosts,
      };
    case 'SET_POSTS':
      return {
        ...state,
        posts: [...action.posts],
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.post, ...(state.posts || [])],
      };
    case 'ADD_POSTS':
      return {
        ...state,
        posts: [...(state.posts || []), ...action.posts],
      };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts?.map((post) => {
          return post.id === action.post.id ? action.post : post;
        }) || null,
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts?.filter((post) => post.id !== action.postId) || null,
      };
    case 'ADD_COMMENT':
      const { comment } = action;
      return {
        ...state,
        posts: state.posts?.map((post) => {
          if (post.id === comment.postId) {
            const postToReturn = { ...post };
            postToReturn.comments.unshift(comment);
            return postToReturn;
          }
          return post;
        }) || null,
      };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        posts: state.posts?.map((post) => {
          if (post.id === action.comment.postId) {
            const idx = post.comments.findIndex(
              (c) => c.id === action.comment.id
            );
            post.comments[idx] = action.comment;
            return post;
          } else {
            return post;
          }
        }) || null,
      };
    case 'REMOVE_COMMENT':
      return {
        ...state,
        posts: state.posts?.map((post) => {
          if (post.id === action.comment.postId) {
            const idx = post.comments.findIndex(
              (c) => c.id === action.comment.id
            );
            post.comments.splice(idx, 1);
            return post;
          } else {
            return post;
          }
        }) || null,
      };
    default:
      return state;
  }
}

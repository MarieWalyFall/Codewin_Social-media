import { Dispatch } from 'redux';
import { postService } from 'services/posts/postService';
import { commentService } from 'services/comment/commentService';
import { socketService } from 'services/socket.service';
import {
  Post,
  Comment,
  FilterByPosts,
  PostAction,
  CommentData,
  SetCurrPageAction,
} from 'types';
import {
  addFilterByPosts,
  addPost,
  setCurrPage,
  setPosts,
  updatePost,
  setFilterByPosts as setFilterByPostsAction,
} from 'store/reducers/postReducer';

export function setCurrPageAction(page: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setCurrPage(page));
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addFilterByPostsAction(filterByPosts: FilterByPosts) {
  return async (dispatch: Dispatch) => {
    dispatch(addFilterByPosts(filterByPosts));
  };
}

export function setFilterByPosts(filterByPosts: FilterByPosts) {
  return async (dispatch: Dispatch) => {
    dispatch(setFilterByPostsAction(filterByPosts));
  };
}

export function setNextPage(page: string) {
  return async (dispatch: Dispatch<PostAction>) => {
    dispatch({ type: 'SET_NEXT_PAGE', payload: page });
  };
}

export function loadPosts() {
  return async (dispatch: Dispatch, getState: () => any) => {
    try {
      const { filterByPosts } = getState().postModule;
      const posts = await postService.query(filterByPosts);
      dispatch(setPosts(posts));
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function getPostsLength() {
  return async (dispatch: Dispatch<PostAction>, getState: () => any) => {
    try {
      const { filterByPosts } = getState().postModule;
      const postsLength = await postService.getPostsLength(filterByPosts);
      dispatch({ type: 'SET_POSTS_LENGTH', payload: postsLength });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addPosts() {
  return async (dispatch: Dispatch<PostAction>, getState: () => any) => {
    try {
      const { filterByPosts } = getState().postModule;
      const { pageNumber } = getState().postModule;
      const newFilterBy = {
        ...filterByPosts,
        page: pageNumber,
      };

      dispatch({ type: 'SET_IS_POSTS_LOADING', payload: true });
      const posts = await postService.query(newFilterBy);
      dispatch({ type: 'ADD_POSTS', payload: posts });
      dispatch({ type: 'SET_IS_POSTS_LOADING', payload: false });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function savePost(post: Partial<Post>) {
  return async (dispatch: Dispatch) => {
    try {
      const addedPost = await postService.save(post);
      post.id ? dispatch(updatePost(addedPost)) : dispatch(addPost(addedPost));

      return addedPost;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function removePost(postId: string) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await postService.remove(postId);

      dispatch({ type: 'REMOVE_POST', payload: postId });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function saveComment(comment: CommentData) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      const savedComment = await commentService.save(comment);
      comment.id
        ? dispatch({ type: 'UPDATE_COMMENT', payload: savedComment })
        : dispatch({ type: 'ADD_COMMENT', payload: savedComment });

      comment.id
        ? socketService.emit('comment-updated', savedComment)
        : socketService.emit('comment-added', savedComment);

      return savedComment;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function removeComment(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await commentService.remove(comment.id); // Ensure this is async
      socketService.emit('comment-removed', comment); // Emit socket event
      dispatch({ type: 'REMOVE_COMMENT', payload: comment }); // Dispatch actual action
    } catch (err) {
      console.error('Failed to remove comment:', err);
    }
  };
}

// HANDLE SOCKETS

export function updatePostForSocket(post: Post) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'UPDATE_POST', payload: post });
      return post;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addPostForSocket(post: Post) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'ADD_POST', payload: post });
      return post;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function removePostForSocket(postId: string) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'REMOVE_POST', payload: postId });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function updateCommentForSocket(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'UPDATE_COMMENT', payload: comment });
      return comment;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addCommentForSocket(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'ADD_COMMENT', payload: comment });
      return comment;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function removeCommentForSocket(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'REMOVE_COMMENT', payload: comment });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

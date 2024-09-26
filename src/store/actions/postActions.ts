import { Dispatch } from 'redux';
import { postService } from 'services/posts/postService';
import { commentService } from 'services/comment/commentService';
import { socketService } from 'services/socket.service';
import { Post, Comment, FilterByPosts, PostAction } from 'types'; 


export function setCurrPage(page: number) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'SET_CURR_PAGE', page });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addFilterByPosts(filterByPosts: FilterByPosts) {
  return async (dispatch: Dispatch<PostAction>) => {
    dispatch({ type: 'ADD_FILTER_BY_POSTS', filterByPosts });
  };
}

export function setFilterByPosts(filterByPosts: FilterByPosts) {
  return async (dispatch: Dispatch<PostAction>) => {
    dispatch({ type: 'SET_FILTER_BY_POSTS', filterByPosts });
  };
}

export function setNextPage(number: number) {
  return async (dispatch: Dispatch<PostAction>) => {
    dispatch({ type: 'SET_NEXT_PAGE', page: number });
  };
}

export function loadPosts() {
  return async (dispatch: Dispatch<PostAction>, getState: () => any) => {
    try {
      const { filterByPosts } = getState().postModule;
      const posts = await postService.query(filterByPosts);
      dispatch({ type: 'SET_POSTS', posts });
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
      dispatch({ type: 'SET_POSTS_LENGTH', postsLength });
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

      dispatch({ type: 'SET_IS_POSTS_LOADING', isLoading: true });
      const posts = await postService.query(newFilterBy);
      dispatch({ type: 'ADD_POSTS', posts });
      dispatch({ type: 'SET_IS_POSTS_LOADING', isLoading: false });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function savePost(post: Post) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      const addedPost = await postService.save(post);
      post.id
        ? dispatch({ type: 'UPDATE_POST', post: addedPost })
        : dispatch({ type: 'ADD_POST', post: addedPost });

      post.id
        ? socketService.emit('post-updated', addedPost)
        : socketService.emit('post-added', addedPost);

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
      socketService.emit('post-removed', postId);
      dispatch({ type: 'REMOVE_POST', postId });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function saveComment(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      const savedComment = await commentService.save(comment);
      comment.id
        ? dispatch({ type: 'UPDATE_COMMENT', comment: savedComment })
        : dispatch({ type: 'ADD_COMMENT', comment: savedComment });

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
      dispatch({ type: 'REMOVE_COMMENT', comment }); // Dispatch actual action
    } catch (err) {
      console.error('Failed to remove comment:', err);
    }
  };
}
// HANDLE SOCKETS

export function updatePostForSocket(post: Post) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'UPDATE_POST', post });
      return post;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addPostForSocket(post: Post) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'ADD_POST', post });
      return post;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function removePostForSocket(postId: string) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'REMOVE_POST', postId });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function updateCommentForSocket(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'UPDATE_COMMENT', comment });
      return comment;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function addCommentForSocket(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'ADD_COMMENT', comment });
      return comment;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function removeCommentForSocket(comment: Comment) {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      dispatch({ type: 'REMOVE_COMMENT', comment });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

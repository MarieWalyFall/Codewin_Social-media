import { Post } from 'types';
import { mockHttpService } from '../mock/mockHttpService';


const ENDPOINT = 'post';

export const postService = {
  query,
  getById,
  remove,
  save,
  getPostsLength,
};

// Cache for posts to avoid redundant requests
const postsCache: { [key: string]: Post } = {};

// Query posts based on filters
async function query(filterBy: any = {}): Promise<Post[]> {
  return await mockHttpService.get(ENDPOINT, filterBy);
}

// Get the total length of posts based on filters
async function getPostsLength(filterBy: any = {}): Promise<number> {
  return await mockHttpService.get(`${ENDPOINT}/length`, filterBy);
}

// Get a post by ID, using cache if available
async function getById(id: string): Promise<Post> {
  if (postsCache[id]) return postsCache[id];
  else {
    const post = await mockHttpService.get(`${ENDPOINT}/${id}`);
    postsCache[id] = post;
    return post;
  }
}

// Remove a post by ID
async function remove(id: string): Promise<void> {
  await mockHttpService.delete("post",id);
}

// Save a post (create or update)
async function save(post: Post): Promise<Post> {
  return post.id
    ? await mockHttpService.put<Post>("post", post)
    : await mockHttpService.post<Post>(ENDPOINT, post);
}

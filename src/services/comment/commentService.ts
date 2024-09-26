import { Comment } from 'types'; 
import { mockHttpService } from '../mock/mockHttpService';

const ENDPOINT = 'comment';

export const commentService = {
  query,
  getById,
  remove,
  save,
};

async function query(filterBy: any = {}): Promise<Comment[]> {
  return await mockHttpService.get(ENDPOINT, filterBy);
}

async function getById(id: string): Promise<Comment> {
  return await mockHttpService.get(`${ENDPOINT}/${id}`);
}

async function remove(commentId: string): Promise<void> {
  // Pass the endpoint and id to the delete method
  return await mockHttpService.delete('comment', commentId);
}

async function save(comment: Comment): Promise<Comment> {
  return comment.id
    ? await mockHttpService.put<Comment>(ENDPOINT, comment)
    : await mockHttpService.post<Comment>(ENDPOINT, comment);
}

// Uncomment to run Immediately Invoked Function Expression (IIFE) for testing
// (async () => {
//   console.log('IFI !');
//   const comments = await query();
//   console.log('comments: ', comments);
// })();

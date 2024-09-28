import { ReactNode } from 'react';

export interface AuthenticationData {
  profile: string;
  username: string;
  password: string;
}

export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: null;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export interface RefreshTokenData {
  token: string;
}

export interface ResetPasswordInitData {
  email: string;
}

export interface ResetPasswordFinishData {
  key: string;
  newPassword: string;
}

export interface DefaultProps {
  children: ReactNode;
}

// Define types for the request data
export interface Post {
  id: string; // Unique identifier for the post
  body: string; // Content of the post
  imgBodyUrl: string | null; // URL of the image associated with the post
  videoBodyUrl: string | null; // URL of the video associated with the post, can be null
  link: string; // Link associated with the post
  title: string; // Title of the post
  createdAt: string; // Timestamp when the post was created in ISO format
  updatedAt?: string; // Timestamp when the post was created in ISO format
  userId: string; // Unique identifier for the user who created the post
  fullname: string; // Full name of the user who created the post
  userProfilePic: string;
  reactions: Reaction[];
  toggleShowImgPreview?: () => void;
  position: { lat: string; lng: string };
  comments: Comment[]; // URL of the user's profile picture
}

export interface User {
  bg?: string;
  phone?: string;
  fullname?: any;
  id: string;
  username: string;
  password: string;
  age?: string;
  name: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  imgUrl: string;
  profession: string;
  location: string;
  connections: ConnectionsList;
  posts?: Partial<Post>[];
  lastSeenActivity?: string | number;
}
export type ConnectionsList = Connection[];

export interface UserCredentials extends Partial<User> {
  username: string;
  password: string;
}

export interface LoggedInUser extends Partial<User> {
  id: string;
}

export interface Connection {
  id: string; // Unique identifier for the connected user
  name: string;
  connected?: string; // Name of the connected user
}

export interface MyConnectionPreviewProps {
  connection: Connection;
}
export interface Login {
  username: string;
  password: string;
}

// Comments

export interface CommentsListProps {
  postId?: string;
  comments: Comment[];
  onSaveComment: (comment: CommentData) => void;
}

export interface InputCommentProps {
  onSaveComment: (comment: CommentData) => void;
}

export interface CommentPreviewProps {
  comment: Comment;
  onSaveComment: (comment: CommentData) => void;
}
export interface CommentMenuProps {
  toggleMenu: () => void;
  onRemoveComment: () => void;
  commentUserId: string; // Assuming commentUserId is a string
}
export interface CommentsProps {
  postId?: string;
  comments?: Comment[];
  userPostId?: string;
}

export interface Comment {
  id: string;
  userId?: string;
  postId?: string;
  createdAt?: number;
  txt?: string;
  reactions?: Reaction[];
  replies?: Reply[];
}
export interface CommentData extends Partial<Comment> {}

export interface Share {
  id: string; // Adjust type if needed
  // Add other properties if needed
}
export interface SocialDetailsProps {
  comments?: Comment[]; // Array of comments
  shares?: Share[]; // Array of shares
  post?: Partial<Post>; // The post object
  onToggleShowComment: () => void; // Function to toggle comments
}
export interface Reaction {
  userId: string;
  fullname: string;
  reaction: string;
}

export interface LikeListProps {
  reactions: Reaction[]; // Array of reactions
  toggleLikes: () => void; // Function to toggle the likes display
}
export interface Reply {
  id: string;
  userId: string;
  postId: string;
  commentId: string;
  txt: string;
  reactions: Reaction[];
  createdAt: number;
}
export interface ReplyListProps {
  replies: Reply[];
  updateReply: (reply: Reply) => void;
}

export interface ReplyPreviewProps {
  reply: Reply;
  updateReply: (reply: Reply) => void;
}

// activity

// Define types for the activity and filter
export interface Activity {
  createdTo: any;
  postId: string;
  createdAt: any;
  id?: string;
  createdBy: string;
  type: string;
  chatId?: string;
  description?: string;
  commentId?: string;
  // Add other activity properties as needed
}

export interface NewActivity extends Activity {}

export interface FilterByActivities {
  type?: string;
  createdBy?: string;
  userId?: string;
}

// Activity Action Types
export interface SetActivitiesAction {
  type: 'SET_ACTIVITIES';
  activities: Activity[];
}

export interface UpdateActivityAction {
  type: 'UPDATE_ACTIVITY';
  activity: Activity;
}

export interface AddActivityAction {
  type: 'ADD_ACTIVITY';
  activity: Activity;
}

export interface SetActivitiesLengthAction {
  type: 'SET_ACTIVITIES_LENGTH';
  activitiesLength: number;
}

export interface AddFilterByActivitiesAction {
  type: 'ADD_FILTER_BY_ACTIVITIES';
  filterByActivities: FilterByActivities;
}

export interface SetFilterByActivitiesAction {
  type: 'SET_FILTER_BY_ACTIVITIES';
  filterByActivities: FilterByActivities;
}

export interface SetUnreadActivitiesAction {
  type: 'SET_UNREAD_ACTIVITIES';
  unreadActivities: string[];
}

export interface SetUnreadMessagesAction {
  type: 'SET_UNREAD_MESSAGES';
  unreadMessages: string[];
}

// Union of all actions
export type ActivityAction =
  | SetActivitiesAction
  | UpdateActivityAction
  | AddActivityAction
  | SetActivitiesLengthAction
  | AddFilterByActivitiesAction
  | SetFilterByActivitiesAction
  | SetUnreadActivitiesAction
  | SetUnreadMessagesAction;

// Post Action Types

export interface SetCurrPageAction {
  type: 'SET_CURR_PAGE';
  payload: string;
}

export interface AddFilterByPostsAction {
  type: 'ADD_FILTER_BY_POSTS';
  filterByPosts: FilterByPosts;
}

export interface SetFilterByPostsAction {
  type: 'SET_FILTER_BY_POSTS';
  filterByPosts: FilterByPosts;
}

export interface SetNextPageAction {
  type: 'SET_NEXT_PAGE';
  payload: string;
}

export interface SetPostsAction {
  type: 'SET_POSTS';
  payload: Post[];
}

export interface SetPostsLengthAction {
  type: 'SET_POSTS_LENGTH';
  payload: number;
}

export interface SetIsPostsLoadingAction {
  type: 'SET_IS_POSTS_LOADING';
  payload: boolean;
}

export interface AddPostsAction {
  type: 'ADD_POSTS';
  payload: Post[];
}

export interface UpdatePostAction {
  type: 'UPDATE_POST';
  payload: Post;
}

export interface AddPostAction {
  type: 'ADD_POST';
  payload: Post;
}

export interface RemovePostAction {
  type: 'REMOVE_POST';
  payload: string;
}

export interface UpdateCommentAction {
  type: 'UPDATE_COMMENT';
  payload: Comment;
}

export interface AddCommentAction {
  type: 'ADD_COMMENT';
  payload: Comment;
}

export interface RemoveCommentAction {
  type: 'REMOVE_COMMENT';
  payload: Comment;
}

// Union of all actions
export type PostAction =
  | SetCurrPageAction
  | AddFilterByPostsAction
  | SetFilterByPostsAction
  | SetNextPageAction
  | SetPostsAction
  | SetPostsLengthAction
  | SetIsPostsLoadingAction
  | AddPostsAction
  | UpdatePostAction
  | AddPostAction
  | RemovePostAction
  | UpdateCommentAction
  | AddCommentAction
  | RemoveCommentAction;

// Define action types

export interface FilterByPosts {
  userId?: string; // Optional: Filter by author ID
  categoryId?: string; // Optional: Filter by category ID
  tags?: string[]; // Optional: Filter by tags
  page?: number; // Optional: Pagination
  sortBy?: SortByOptions; // Optional: Sort criteria
}
export type SortByOptions = 'date-newest' | 'date-oldest' | 'likes';
export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  userId?: string;
  txt?: string;
}

// Chat Interface
export interface Chat {
  messages: Message[];
  createdAt: Date | string; //
  id?: string; //
  users?: string[];
  userId?: string;
  userId2?: string;
}

// Messaging Props
export interface MessagingProps {
  chats?: Chat[];
  chatWith?: User | null;
  messagesToShow?: Message[] | null;
  setMessagesToShow?: (messages: Message[]) => void;
  chooseenChatId?: string; // Change to number if id is a number
  setChooseenChatId?: (id: string) => Promise<void>;
  setChatWith?: React.Dispatch<React.SetStateAction<User | null>>;
  getTheNotLoggedUserChat?: (chat: Chat) => Promise<User | null>;
  setTheNotLoggedUserChat?: React.Dispatch<React.SetStateAction<User | null>>;
  theNotLoggedUserChat?: User | null;
  onSendMsg?: (message: NewMessage) => void; // Change 'any' to Message
}

// Message Thread Props
export interface MessageThreadProps {
  messagesToShow: Message[] | null;
  setMessagesToShow: (messages: Message[]) => void;
  chatWith: User | null;
  onSendMsg: (message: NewMessage) => void;
}

// Msg Preview Props
export interface MsgPreviewProps {
  chat: Chat;
  chats: Chat[];
  setMessagesToShow: (messages: Message[]) => void;
  setChatWith: React.Dispatch<React.SetStateAction<User | null>>;
  chatWith: User | null;
  chooseenChatId: string; // Change to number if id is a number
  setChooseenChatId?: (id: string) => Promise<void>;
  getTheNotLoggedUserChat: (chat: Chat) => Promise<User | null>;
  setTheNotLoggedUserChat: React.Dispatch<React.SetStateAction<User | null>>;
  theNotLoggedUserChat: User | null;
}

// List Msg Props
export interface ListMsgProps {
  chats: Chat[];
  setMessagesToShow: (messages: Message[]) => void;
  setChatWith: React.Dispatch<React.SetStateAction<User | null>>;
  chatWith: User | null;
  setChooseenChatId?: (id: string) => Promise<void>;
  chooseenChatId: string; // Change to number if id is a number
  getTheNotLoggedUserChat: (chat: Chat) => Promise<User | null>;
  setTheNotLoggedUserChat: React.Dispatch<React.SetStateAction<User | null>>;
  theNotLoggedUserChat: User | null;
}
export interface NewMessage extends Partial<Message> {}
export interface SendMessageFormProps {
  onSendMsg: (message: NewMessage) => void;
  messagesToShow: any[];
}

// Thread Message List Props
export interface ThreadMsgListProps extends Partial<MessageThreadProps> {}

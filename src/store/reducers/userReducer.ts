import { User } from "types";

interface FilterByUsers {
  [key: string]: any; // Adjust the type according to the expected structure
}

interface UserState {
  loggedInUser: User | null;
  users: User[] | null;
  usersToAdd: User[] | null; // Adjust if needed
  filterByUsers: FilterByUsers | null;
  connectedUsers: User[]; // Array of connected users
  isLogingLoading: boolean;
}

// Define action types
type Action =
  | { type: 'SET_USERS'; users: User[] }
  | { type: 'SET_FILTER_BY_USERS'; filterByUsers: FilterByUsers }
  | { type: 'SET_IS_LOADING_LOGING'; bool: boolean }
  | { type: 'LOGIN'; user: User }
  | { type: 'GET_LOGGEDIN_USER'; user: User }
  | { type: 'SIGNUP'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'Add_USER'; user: User }
  | { type: 'UPDATE_USER'; user: User }
  | { type: 'UPDATE_LOGGED_IN_USER'; user: User }
  | { type: 'SET_CONNECTED_USERS'; connectedUsers: User[] }
  | { type: 'ADD_CONNECTED_USER'; connectedUser: User };

// Initialize state
const INITIAL_STATE: UserState = {
  loggedInUser: null,
  users: null,
  usersToAdd: null,
  filterByUsers: null,
  connectedUsers: [],
  isLogingLoading: false,
};

// Reducer function
export function userReducer(state: UserState = INITIAL_STATE, action: Action): UserState {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      };
    case 'SET_FILTER_BY_USERS':
      return {
        ...state,
        filterByUsers: { ...action.filterByUsers },
      };
    case 'SET_IS_LOADING_LOGING':
      return {
        ...state,
        isLogingLoading: action.bool,
      };
    case 'LOGIN':
      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'GET_LOGGEDIN_USER':
      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'SIGNUP':
      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
      };
    case 'Add_USER':
      return {
        ...state,
        users: state.users ? [...state.users, action.user] : [action.user],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users?.map((user) => {
          return user.id === action.user.id ? action.user : user;
        }) || null,
      };
    case 'UPDATE_LOGGED_IN_USER':
      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'SET_CONNECTED_USERS':
      return {
        ...state,
        connectedUsers: action.connectedUsers,
      };
    case 'ADD_CONNECTED_USER':
      return {
        ...state,
        connectedUsers: [...state.connectedUsers, action.connectedUser],
      };
    default:
      return state;
  }
}

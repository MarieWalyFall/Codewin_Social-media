import { userService } from 'services/user/userService';
import { socketService } from 'services/socket.service';
import { User, UserCredentials } from 'types';
import { useSelector } from 'react-redux';
import {
  login as loginAction,
  logout as logoutAction,
  setUsers as setUsersAction,
} from 'store/reducers/userReducer';

// Action types are defined as strings or enums
export function getUsers() {
  return async (dispatch: any, getState: any) => {
    try {
      const { filterByUsers } = getState().userModule;
      const users = await userService.getUsers(filterByUsers);
      dispatch(setUsersAction(users));
    } catch (err) {
      console.log('cannot get users:', err);
    }
  };
}

export function setUsers(users: User[]) {
  return async (dispatch: any) => {
    try {
      dispatch(setUsersAction(users));
    } catch (err) {
      console.log('cannot set users:', err);
    }
  };
}

export function setFilterByUsers(filterByUsers: any) {
  return async (dispatch: any) => {
    dispatch({ type: 'SET_FILTER_BY_USERS', filterByUsers });
  };
}

export function login(userCred: UserCredentials) {
  return async (dispatch: any) => {
    try {
      socketService.setup();
      const session = localStorage.getItem('loggedInUser');
      if (session) {
        dispatch(loginAction(sessionStorage.loggedInUser));
        console.log('yup');
        return;
      }
      const user: User = await userService.login(userCred);
      dispatch(loginAction(user));
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      socketService.emit('setUserSocket', user.id);
      return user;
    } catch (err) {
      console.log("can't login:", err);
      throw new Error(String(err));
    }
  };
}

export function refreshSession() {
  return async (dispatch: any) => {
    console.log('refreshing session');
    try {
      // Get the session data from localStorage or sessionStorage
      const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser') || 'null'
      );
      if (loggedInUser) {
        // Dispatch login action with the parsed user data
        dispatch(loginAction(loggedInUser));
        console.log('Session refreshed, user logged in');
      } else {
        console.log('No user found in session storage');
      }
    } catch (err) {
      console.log('Error refreshing session:', err);
      throw new Error(String(err));
    }
  };
}

export function getLoggedinUser() {
  return async (dispatch: any) => {
    try {
      const user = await userService.getLoggedinUser();
      if (user === null) throw new Error('user not found');
      dispatch({ type: 'GET_LOGGEDIN_USER', user });
      return user;
    } catch (err) {
      console.log('cannot getLoggedinUser:', err);
    }
  };
}

export function signup(userCred: UserCredentials) {
  return async (dispatch: any) => {
    try {
      const user = await userService.signup(userCred);
      dispatch({ type: 'SIGNUP', user });
      return user;
    } catch (err) {
      console.log('cannot signup:', err);
    }
  };
}

export function logout() {
  return async (dispatch: any) => {
    try {
      await userService.logout();
      dispatch(logoutAction());
      return true;
    } catch (err) {
      console.log('cannot logout:', err);
    }
  };
}

export function updateUser(user: Partial<User>) {
  return async (dispatch: any, getState: any) => {
    const savedUser = await userService.update(user);
    const { loggedInUser } = getState().userModule;

    if (savedUser.id === loggedInUser.id) {
      dispatch({ type: 'UPDATE_LOGGED_IN_USER', user: savedUser });
    }
    return savedUser;
  };
}

export function removeUser(userId: string) {
  return async (dispatch: any) => {
    try {
      await userService.remove(userId);
      dispatch({ type: 'REMOVE_USER', userId });
    } catch (err) {
      console.log('cannot remove user', err);
    }
  };
}

export function getUserById(userId: string) {
  return async (dispatch: any, getState: any) => {
    try {
      const { users } = getState().userModule;
      if (users[userId]) return users[userId];

      const user = await userService.getById(userId);
      dispatch({ type: 'SAVE_USER', user });
      return user;
    } catch (err) {
      console.log('cannot getUserById:', err);
    }
  };
}

export function setLogingLoading(bool: boolean) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: 'SET_IS_LOADING_LOGING', bool });
    } catch (err) {
      console.log('cannot set loading state:', err);
    }
  };
}

export function addConnectedUsersForSocket(connectedUsers: User[]) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: 'SET_CONNECTED_USERS', connectedUsers });
      return connectedUsers;
    } catch (err) {
      console.log('cannot add connected users:', err);
    }
  };
}

export function addConnectedUserForSocket(connectedUser: User) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: 'ADD_CONNECTED_USER', connectedUser });
      return connectedUser;
    } catch (err) {
      console.log('cannot add connected user:', err);
    }
  };
}

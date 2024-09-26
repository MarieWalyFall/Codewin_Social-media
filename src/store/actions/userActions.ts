import { userService } from 'services/user/userService';
import { socketService } from 'services/socket.service';
import { User, UserCredentials } from 'types'; 

// Action types are defined as strings or enums
export function getUsers() {
  return async (dispatch: any, getState: any) => {
    try {
      const { filterByUsers } = getState().userModule;
      const users = await userService.getUsers(filterByUsers);
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log('cannot get users:', err);
    }
  };
}

export function setUsers(users: User[]) {
  return async (dispatch: any) => {
    try {
      dispatch({ type: 'SET_USERS', users });
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
      const user = await userService.login(userCred);
      dispatch({ type: 'LOGIN', user });

      socketService.emit('setUserSocket', user.id);

      return user;
    } catch (err) {
      console.log("can't do login:", err);
      throw new Error(String(err));
    }
  };
}

export function getLoggedinUser() {
  return async (dispatch: any) => {
    try {
      const user = await userService.getLoggedinUser();
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
      dispatch({ type: 'LOGOUT' });
      return true;
    } catch (err) {
      console.log('cannot logout:', err);
    }
  };
}

export function updateUser(user: User) {
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

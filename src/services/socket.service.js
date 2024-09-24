import io from 'socket.io-client';

export const SOCKET_EMIT_USER_WATCH = 'user-watch';
export const SOCKET_EVENT_USER_UPDATED = 'user-updated';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030';

export const socketService = createSocketService();

// Call the setup function explicitly when you need to set up a connection.
function createSocketService() {
  let socket = null; // Use `let` so you can reassign it properly in `terminate`.

  const socketService = {
    async setup() {
      if (!socket) {
        socket = io(baseUrl, {
          autoConnect: false,  // Don't auto-connect until setup is called
        });
        socket.connect(); // Explicitly connect after setup
      }
    },

    on(eventName, cb) {
      if (!socket) {
        console.error('Socket is not initialized, cannot listen to events.');
        return;
      }
      socket.on(eventName, cb);
    },

    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },

    emit(eventName, data) {
      if (!socket) {
        console.error('Socket is not initialized, cannot emit events.');
        return;
      }
      socket.emit(eventName, data);
    },

    terminate() {
      if (socket) {
        socket.disconnect(); // Properly disconnect from the socket
        socket.removeAllListeners(); // Remove all event listeners to avoid memory leaks
        socket = null; // Reset the socket variable
      }
    },
  };

  return socketService;
}

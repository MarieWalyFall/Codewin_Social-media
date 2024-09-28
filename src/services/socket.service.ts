import { io, Socket } from 'socket.io-client';

export const SOCKET_EMIT_USER_WATCH = 'user-watch';
export const SOCKET_EVENT_USER_UPDATED = 'user-updated';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030';

export const socketService = createSocketService();

interface SocketService {
  setup(): Promise<void>;
  on(eventName: string, cb: (data: any) => void): void;
  off(eventName: string, cb?: (data: any) => void): void;
  emit(eventName: string, data: any): void;
  terminate(): void;
}

function createSocketService(): SocketService {
  let socket: Socket | null = null;

  const socketService: SocketService = {
    async setup() {
      console.log('socketService');
      if (!socket) {
        socket = io(baseUrl, {
          autoConnect: false, // Don't auto-connect until setup is called
        });
        socket = socket.connect();
      }
    },

    on(eventName: string, cb: (data: any) => void) {
      if (!socket) {
        console.error('Socket is not initialized, cannot listen to events.');
        return;
      }
      socket.on(eventName, cb);
    },

    off(eventName: string, cb: ((data: any) => void) | null = null) {
      if (!socket) return;
      if (!cb) {
        socket.removeAllListeners(eventName);
      } else {
        socket.off(eventName, cb);
      }
    },

    emit(eventName: string, data: any) {
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

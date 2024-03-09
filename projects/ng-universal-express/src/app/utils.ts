import compressionModule from 'compression';
import {Express} from 'express';
import serverTiming from 'server-timing';

export function addServerTiming(
  function_: (request: any, response: any, next: any) => Promise<any>,
  cfg: { name: string; label?: string }
) {
  return async (request: any, response: any, next: any) => {
    response.startTime(cfg.name, cfg.label || cfg.name);
    const result = await function_(request, response, next);
    response.endTime(cfg.name);
    return result;
  };
}

export function useCompression(server: Express) {
  // **🚀 Perf Tip:**
  // Serve gzip for faster load
  server.use(compressionModule());
}

export function useTiming(server: Express) {
  server.use(serverTiming());
}

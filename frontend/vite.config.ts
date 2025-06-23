import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'ec2-54-161-250-11.compute-1.amazonaws.com'
    ],
    host: true
  }
});

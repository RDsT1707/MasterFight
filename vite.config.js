import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Remplace par TON nom d'utilisateur et TON nom de repo
export default defineConfig({
  plugins: [react()],
  base: '/MasterFight/', 
});
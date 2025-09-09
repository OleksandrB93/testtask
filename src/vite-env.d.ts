/// <reference types="vite/client" />

declare global {
  // Global types for the application
}

declare module "*.svg" {
  const content: string;
  export default content;
}

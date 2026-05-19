declare module '*.astro' {
  interface AstroInstance {
    default: any;
  }
  const instance: AstroInstance;
  export default instance;
}

declare module 'astro:content' {
  export interface Render {
    Content: import('astro').MarkdownInstance<Record<string, any>>['Content'];
    headings: import('astro').MarkdownHeading[];
  }
}

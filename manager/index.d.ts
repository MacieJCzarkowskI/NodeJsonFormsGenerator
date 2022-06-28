declare namespace React {
  // eslint-disable-next-line no-undef
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: any
  }
}

declare module 'tailwindcss/resolveConfig' {
  const resolveConfig: (config: any) => any
  export default resolveConfig
}

declare module 'url' {
  export interface URL {
    protocol: string;
    hostname: string;
    pathname: string;
  }
  export function parse(url: string): URL;
}

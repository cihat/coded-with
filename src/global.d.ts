declare const __DEV__: boolean
/** Extension name, defined in packageJson.name */
declare const __NAME__: string

declare module '*.vue' {
  const component: any
  export default component
}

declare type LinkType = HTMLAnchorElement | HTMLAreaElement;

type GithubLinksInfo = {
  link: string
  language: string
}

type compareUrls = any

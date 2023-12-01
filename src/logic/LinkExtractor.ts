import GitHubRepoInfo from './GitHubRepoInfo'

export default class LinkExtractor {
  uniqueLinks: Set<string>
  githubLinksInfo: GithubLinksInfo[] = []

  constructor(links: LinkType[]) {
    this.uniqueLinks = new Set()
    links.forEach(link => this.addToUniqueLinks(link.href))
  }

  areUrlsSameSite(url1: string, url2: string): boolean {
    const normalizeUrl = (url: string) => {
      const parsedUrl = new URL(url)
      return `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}`
    }

    const normalizedUrl1 = normalizeUrl(url1)
    const normalizedUrl2 = normalizeUrl(url2)

    return normalizedUrl1 === normalizedUrl2
  }

  addToUniqueLinks(link: string) {
    for (const existingLink of this.uniqueLinks) {
      if (this.areUrlsSameSite(existingLink, link))
        return // Already exists, do not add
    }
    this.uniqueLinks.add(link)
  }

  async getGithubLinks() {
    const githubRepoUrlPattern = /^https:\/\/github\.com\/(?!.*(?:new|codespaces|sponsors|settings)\/)[^\/]*\/[^\/]*\/?$/
    const gitHubRepoInfo = await new GitHubRepoInfo()

    for (const uniqueLink of this.uniqueLinks) {
      if (githubRepoUrlPattern.test(uniqueLink)) {
        const language = await gitHubRepoInfo.getLanguage(uniqueLink)

        if (language !== null) {
          this.githubLinksInfo.push({
            link: uniqueLink,
            language,
          })
        }
      }
    }
  }
}

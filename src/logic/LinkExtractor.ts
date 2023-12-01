import GitHubRepoInfo from './GitHubRepoInfo'

export default class LinkExtractor {
  allLinks: LinkType[]
  githubLinksInfo: GithubLinksInfo[] = []

  constructor(links: LinkType[]) {
    this.allLinks = links
  }

  async getGithubLinks() {
    const githubRegExp = /^https:\/\/github\.com\/(?!.*(?:new|codespaces|sponsors|settings)\/)[^\/]*\/[^\/]*\/?$/
    const gitHubRepoInfo = await new GitHubRepoInfo()

    for (let i = 0; i < this.allLinks.length; i++) {
      const link = this.allLinks[i]

      if (githubRegExp.test(link.href)) {
        const language = await gitHubRepoInfo.getLanguage(link.href)

        if (language !== null) {
          this.githubLinksInfo.push({
            link: link.href,
            language,
          })
        }
      }
    }
  }
}

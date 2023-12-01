export default class GitHubRepoInfo {
  private apiKey = import.meta.env.VITE_GITHUB_API_KEY
  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${this.apiKey}`,
  }

  async getLanguage(link: string): Promise<string | null> {
    const { username, projectName } = this.parseGitHubUrl(link) || {}
    try {
      const apiUrl = `https://api.github.com/repos/${username}/${projectName}`
      const response = await fetch(apiUrl, { headers: this.headers })

      if (!response.ok)
        throw new Error(`GitHub API error: ${response.status}`)

      const repoData = await response.json()

      return repoData.language
    }
    catch (error) {
      return error.message
    }
  }

  parseGitHubUrl(url: string): { username: string; projectName: string } | null {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)$/)

    if (match)
      return { username: match[1], projectName: match[2] }

    return null
  }
}

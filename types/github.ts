/**
 * GitHub API Type Definitions
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  homepage: string;
  pinned?: boolean;
}

export interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  html_url: string;
}

export interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  most_used_language: string;
  languages: Record<string, number>;
}

export interface GitHubActivity {
  type: string;
  repo: string;
  created_at: string;
  action: string;
}

export interface GitHubData {
  profile: GitHubProfile;
  repositories: GitHubRepo[];
  stats: GitHubStats;
  activity: GitHubActivity[];
  lastUpdated: string;
}

export interface GitHubApiResponse {
  profile?: GitHubProfile;
  repositories?: GitHubRepo[];
  stats?: GitHubStats;
  activity?: GitHubActivity[];
  lastUpdated?: string;
  error?: string;
}

export interface GitHubRepositoriesProps {
  repositories: GitHubRepo[];
}

export interface GitHubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string | null;
  hooks_url: string;
  svn_url: string;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template: boolean;
  topics: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  pushed_at: string | null;
  created_at: string;
  updated_at: string;
  permissions?: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
  allow_rebase_merge: boolean;
  template_repository: GitHubRepository | null;
  temp_clone_token: string;
  allow_squash_merge: boolean;
  allow_auto_merge: boolean;
  delete_branch_on_merge: boolean;
  allow_merge_commit: boolean;
  subscribers_count: number;
  network_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
    node_id: string;
  } | null;
  forks: number;
  open_issues: number;
  watchers: number;
}

export interface GitHubEvent {
  id: string;
  type: GitHubEventType;
  actor: GitHubUser;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: GitHubEventPayload;
  public: boolean;
  created_at: string;
  org?: GitHubUser;
}

export type GitHubEventType =
  | "PushEvent"
  | "CreateEvent"
  | "DeleteEvent"
  | "ForkEvent"
  | "WatchEvent"
  | "IssuesEvent"
  | "IssueCommentEvent"
  | "PullRequestEvent"
  | "PullRequestReviewEvent"
  | "PullRequestReviewCommentEvent"
  | "ReleaseEvent"
  | "PublicEvent"
  | "MemberEvent"
  | "GollumEvent";

export interface GitHubEventPayload {
  action?: string;
  ref_type?: string;
  ref?: string;
  master_branch?: string;
  description?: string;
  pusher_type?: string;
  commits?: Array<{
    sha: string;
    author: {
      email: string;
      name: string;
    };
    message: string;
    distinct: boolean;
    url: string;
  }>;
  issue?: {
    id: number;
    number: number;
    title: string;
    body: string;
    user: GitHubUser;
    state: string;
    created_at: string;
    updated_at: string;
  };
  pull_request?: {
    id: number;
    number: number;
    title: string;
    body: string;
    user: GitHubUser;
    state: string;
    created_at: string;
    updated_at: string;
  };
  release?: {
    id: number;
    tag_name: string;
    name: string;
    body: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
  };
  forkee?: GitHubRepository;
}

// Application-specific interfaces
export interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  homepage: string;
}

export interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  most_used_language: string;
  languages: Record<string, number>;
}

export interface GitHubActivity {
  type: string;
  repo: string;
  created_at: string;
  action: string;
}

export interface GitHubApiResponse {
  profile?: GitHubProfile;
  repositories?: GitHubRepo[];
  stats?: GitHubStats;
  activity?: GitHubActivity[];
  lastUpdated?: string;
}

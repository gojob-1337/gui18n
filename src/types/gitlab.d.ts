declare module 'gitlab' {
  export interface Namespace {
    id: number;
    name: string;
    path: string;
    kind: string;
    full_path: string;
    parent_id?: any;
  }

  export interface Links {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
  }

  export interface GroupAccess {
    access_level: number;
    notification_level: number;
  }

  export interface Permissions {
    project_access?: any;
    group_access: GroupAccess;
  }

  export interface Project {
    id: number;
    description: string;
    name: string;
    name_with_namespace: string;
    path: string;
    path_with_namespace: string;
    created_at: Date;
    default_branch: string;
    tag_list: any[];
    ssh_url_to_repo: string;
    http_url_to_repo: string;
    web_url: string;
    readme_url: string;
    avatar_url: string;
    star_count: number;
    forks_count: number;
    last_activity_at: Date;
    namespace: Namespace;
    _links: Links;
    archived: boolean;
    visibility: string;
    resolve_outdated_diff_discussions: boolean;
    container_registry_enabled: boolean;
    issues_enabled: boolean;
    merge_requests_enabled: boolean;
    wiki_enabled: boolean;
    jobs_enabled: boolean;
    snippets_enabled: boolean;
    shared_runners_enabled: boolean;
    lfs_enabled: boolean;
    creator_id: number;
    import_status: string;
    open_issues_count: number;
    public_jobs: boolean;
    ci_config_path?: any;
    shared_with_groups: any[];
    only_allow_merge_if_pipeline_succeeds: boolean;
    request_access_enabled: boolean;
    only_allow_merge_if_all_discussions_are_resolved: boolean;
    printing_merge_request_link_enabled: boolean;
    merge_method: string;
    permissions: Permissions;
    approvals_before_merge: number;
    mirror: boolean;
    external_authorization_classification_label: string;
    packages_enabled?: boolean;
  }

  export type RepositoryFile = {
    id: string;
    name: string;
    type: string;
    path: string;
    mode: string;
  };
}

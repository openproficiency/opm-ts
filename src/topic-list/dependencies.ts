// Installed Imports
import { valid as validSemver } from 'semver';
//

//
// CONSTANTS
//

const identifierPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ownerPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z]{2,}$/;

//
// PUBLIC TYPES
//

export type TopicListDependencyDetails = {
  topicListOwner: string;
  topicListName: string;
  topicListVersion: string;
  locations?: string[];
};

export type TopicListDependency = string | TopicListDependencyDetails;

export type DependencyTopic = {
  dependency: string;
  topic: string;
};

//
// PUBLIC FUNCTIONS
//

/** Formats a dependency topic identifier as a dot-separated string. */
export function formatDependencyTopic(value: DependencyTopic): string {
  return `${value.dependency}.${value.topic}`;
}

/** Formats a topic-list dependency as owner/name@version shorthand. */
export function formatDependency(
  dependency: TopicListDependencyDetails,
): string {
  return `${dependency.topicListOwner}/${dependency.topicListName}@${dependency.topicListVersion}`;
}

/** Parses a dependency-qualified topic identifier into its parts. */
export function parseDependencyTopic(value: string): DependencyTopic | null {
  const segments = value.split('.');

  // Require at least a dependency segment and a topic segment, all valid identifiers.
  if (
    segments.length < 2 ||
    !segments.every((segment) => identifierPattern.test(segment))
  ) {
    return null;
  }

  return {
    dependency: segments[0],
    topic: segments.slice(1).join('.'),
  };
}

/** Parses a topic-list dependency shorthand into its structured parts. */
export function parseDependency(
  value: string,
): TopicListDependencyDetails | null {
  // Locate the separators expected between owner/name and name@version.
  const slash = value.indexOf('/');
  const at = value.lastIndexOf('@');

  if (slash < 1 || at <= slash + 1 || at === value.length - 1) {
    return null;
  }

  const topicListOwner = value.slice(0, slash);
  const topicListName = value.slice(slash + 1, at);
  const topicListVersion = value.slice(at + 1);

  // Validate each segment against its expected pattern.
  if (
    !ownerPattern.test(topicListOwner) ||
    !identifierPattern.test(topicListName) ||
    validSemver(topicListVersion) !== topicListVersion
  ) {
    return null;
  }

  return { topicListOwner, topicListName, topicListVersion };
}

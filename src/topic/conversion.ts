// Project Imports
import type { Topic as SchemaTopic } from './topic.schema.js';
import type { Topic } from './topic.js';
//

//
// PUBLIC FUNCTIONS
//

/** Converts a schema-format topic to its camelCase representation. */
export function fromSchemaTopic(topic: SchemaTopic): Topic {
  return omitUndefined({
    $schema: topic.$schema,
    id: topic.id,
    displayName: topic['display-name'],
    description: topic.description,
    docsUrl: topic['docs-url'],
    validityPeriod: topic['validity-period'],
    subtopics: topic.subtopics?.map((subtopic) =>
      typeof subtopic === 'string' ? subtopic : fromSchemaTopic(subtopic),
    ),
    pretopics: topic.pretopics,
  });
}

/** Converts a camelCase topic to its schema representation. */
export function toSchemaTopic(topic: Topic): SchemaTopic {
  return omitUndefined({
    $schema: topic.$schema,
    id: topic.id,
    'display-name': topic.displayName,
    description: topic.description,
    'docs-url': topic.docsUrl,
    'validity-period': topic.validityPeriod,
    subtopics: topic.subtopics?.map((subtopic) =>
      typeof subtopic === 'string' ? subtopic : toSchemaTopic(subtopic),
    ),
    pretopics: topic.pretopics,
  });
}

//
// PRIVATE FUNCTIONS
//

/** Removes properties whose value is undefined. */
function omitUndefined<T extends object>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as T;
}

// Project Imports
import {
  fromSchemaTopic,
  toSchemaTopic,
} from '../topic/conversion.js';
import type { TopicListDependency } from './dependencies.js';
import type { TopicList as SchemaTopicList } from './topic-list.schema.js';
import type { TopicList } from './topic-list.js';
//

//
// PUBLIC FUNCTIONS
//

/** Converts a schema-format topic list to its camelCase representation. */
export function fromSchemaTopicList(topicList: SchemaTopicList): TopicList {
  return omitUndefined({
    $schema: topicList.$schema,
    owner: topicList.owner,
    name: topicList.name,
    description: topicList.description,
    version: topicList.version,
    issuedAt: new Date(topicList['issued-at']),
    signature: topicList.signature,
    signedBy: topicList['signed-by'],
    topics: mapValues(topicList.topics, fromSchemaTopic),
    dependencies:
      topicList.dependencies === undefined
        ? undefined
        : mapValues(topicList.dependencies, fromSchemaDependency),
  });
}

/** Converts a camelCase topic list to its schema representation. */
export function toSchemaTopicList(topicList: TopicList): SchemaTopicList {
  return omitUndefined({
    $schema: topicList.$schema,
    owner: topicList.owner,
    name: topicList.name,
    description: topicList.description,
    version: topicList.version,
    'issued-at': topicList.issuedAt.toISOString(),
    signature: topicList.signature,
    'signed-by': topicList.signedBy,
    topics: mapValues(topicList.topics, toSchemaTopic),
    dependencies:
      topicList.dependencies === undefined
        ? undefined
        : mapValues(topicList.dependencies, toSchemaDependency),
  });
}

//
// PRIVATE TYPES
//

type SchemaTopicListDependency = NonNullable<
  SchemaTopicList['dependencies']
>[string];

//
// PRIVATE FUNCTIONS
//

/** Converts a schema-format topic-list dependency to its camelCase representation. */
function fromSchemaDependency(
  dependency: SchemaTopicListDependency,
): TopicListDependency {
  if (typeof dependency === 'string') return dependency;

  return omitUndefined({
    topicListOwner: dependency['topic-list-owner'],
    topicListName: dependency['topic-list-name'],
    topicListVersion: dependency['topic-list-version'],
    locations: dependency.locations,
  });
}

/** Maps each value of a record through a conversion function. */
function mapValues<Input, Output>(
  values: Record<string, Input>,
  map: (value: Input) => Output,
): Record<string, Output> {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, map(value)]),
  );
}

/** Removes properties whose value is undefined. */
function omitUndefined<T extends object>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as T;
}

/** Converts a camelCase topic-list dependency to its schema representation. */
function toSchemaDependency(
  dependency: TopicListDependency,
): SchemaTopicListDependency {
  if (typeof dependency === 'string') return dependency;

  return omitUndefined({
    'topic-list-owner': dependency.topicListOwner,
    'topic-list-name': dependency.topicListName,
    'topic-list-version': dependency.topicListVersion,
    locations: dependency.locations,
  });
}

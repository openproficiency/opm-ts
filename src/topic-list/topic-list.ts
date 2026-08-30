// Project Imports
import topicListSchema from '../../schemas/topic-list.schema.json' with { type: 'json' };
import topicSchema from '../../schemas/topic.schema.json' with { type: 'json' };
import {
  parseSchema,
  schemaValidator,
} from '../model/schema-registry.js';
import type { Topic } from '../topic/topic.js';
import { fromSchemaTopicList, toSchemaTopicList } from './conversion.js';
import type { TopicListDependency } from './dependencies.js';
import type { TopicList as SchemaTopicList } from './topic-list.schema.js';
//

//
// CONSTANTS
//

const validateSchemaTopicList = schemaValidator<SchemaTopicList>(
  ['topic-list', topicListSchema],
  [['topic', topicSchema]],
);

//
// PUBLIC TYPES
//

export type TopicList = {
  $schema?: string;
  owner: string;
  name: string;
  description: string;
  version: string;
  issuedAt: Date;
  signature: string | null;
  signedBy: string | null;
  topics: Record<string, Topic>;
  dependencies?: Record<string, TopicListDependency>;
};

export type KeyedTopic = {
  id: string;
  topic: Topic;
};

//
// PUBLIC FUNCTIONS
//

/** Lists topics with the identifiers used as their map keys. */
export function entries(topicList: TopicList): KeyedTopic[] {
  // Attach each topic's map key without changing the topic.
  return Object.entries(topicList.topics).map(([id, topic]) => ({ id, topic }));
}

/** Parses unknown model data into a topic list. */
export function parse(value: unknown): TopicList {
  // Validate and convert the schema data.
  return parseSchema(
    'TopicList',
    value,
    validateSchemaTopicList,
    fromSchemaTopicList,
  );
}

/** Serializes a topic list to its model schema representation. */
export function serialize(topicList: TopicList): object {
  // Convert the domain object to schema data.
  return toSchemaTopicList(topicList);
}

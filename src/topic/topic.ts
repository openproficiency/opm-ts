// Project Imports
import topicSchema from '../../schemas/topic.schema.json' with { type: 'json' };
import {
  parseSchema,
  schemaValidator,
} from '../model/schema-registry.js';
import { fromSchemaTopic, toSchemaTopic } from './conversion.js';
import type { Topic as SchemaTopic } from './topic.schema.js';

//
// CONSTANTS
//

const validateSchemaTopic = schemaValidator<SchemaTopic>([
  'topic',
  topicSchema,
]);

//
// PUBLIC TYPES
//

export type Topic = {
  $schema?: string;
  id?: string;
  displayName?: string;
  description: string;
  docsUrl?: string;
  validityPeriod?: number;
  subtopics?: (string | Topic)[];
  pretopics?: string[];
};

//
// PUBLIC FUNCTIONS
//

/** Parses unknown model data into a topic. */
export function parse(value: unknown): Topic {
  // Validate and convert the schema data.
  return parseSchema('Topic', value, validateSchemaTopic, fromSchemaTopic);
}

/** Serializes a topic to its model schema representation. */
export function serialize(topic: Topic): object {
  // Convert the domain object to schema data.
  return toSchemaTopic(topic);
}

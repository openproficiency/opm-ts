// Project Imports
import transcriptEntrySchema from '../../schemas/transcript-entry.schema.json' with { type: 'json' };
import transcriptSchema from '../../schemas/transcript.schema.json' with { type: 'json' };
import {
  parseSchema,
  schemaValidator,
} from '../model/schema-registry.js';
import type { TranscriptEntry } from '../transcript-entry/transcript-entry.js';
import {
  fromSchemaTranscript,
  toSchemaTranscript,
} from './conversion.js';
import type { Transcript as SchemaTranscript } from './transcript.schema.js';
//

//
// CONSTANTS
//

const validateSchemaTranscript = schemaValidator<SchemaTranscript>(
  ['transcript', transcriptSchema],
  [['transcript-entry', transcriptEntrySchema]],
);

//
// PUBLIC TYPES
//

export type Transcript = TranscriptEntry[];

//
// PUBLIC FUNCTIONS
//

/** Parses unknown model data into a transcript. */
export function parse(value: unknown): Transcript {
  // Validate and convert the schema data.
  return parseSchema(
    'Transcript',
    value,
    validateSchemaTranscript,
    fromSchemaTranscript,
  );
}

/** Serializes a transcript to its model schema representation. */
export function serialize(transcript: Transcript): object {
  // Convert the domain object to schema data.
  return toSchemaTranscript(transcript);
}

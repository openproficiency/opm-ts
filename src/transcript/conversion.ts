// Project Imports
import {
  fromSchemaTranscriptEntry,
  toSchemaTranscriptEntry,
} from '../transcript-entry/conversion.js';
import type { Transcript as SchemaTranscript } from './transcript.schema.js';
import type { Transcript } from './transcript.js';
//

//
// PUBLIC FUNCTIONS
//

/** Converts a schema-format transcript to its camelCase representation. */
export function fromSchemaTranscript(transcript: SchemaTranscript): Transcript {
  return transcript.map(fromSchemaTranscriptEntry);
}

/** Converts a camelCase transcript to its schema representation. */
export function toSchemaTranscript(transcript: Transcript): SchemaTranscript {
  return transcript.map(toSchemaTranscriptEntry);
}

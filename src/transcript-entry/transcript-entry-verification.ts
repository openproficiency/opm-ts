// Project Imports
import transcriptEntryVerificationSchema from '../../schemas/transcript-entry-verification.schema.json' with { type: 'json' };
import {
  parseSchema,
  schemaValidator,
} from '../model/schema-registry.js';
import {
  fromSchemaTranscriptEntryVerification,
  toSchemaTranscriptEntryVerification,
} from './conversion.js';
import type { TranscriptEntryVerificationResponse as SchemaTranscriptEntryVerification } from './transcript-entry-verification.schema.js';
//

//
// CONSTANTS
//

const validateSchemaTranscriptEntryVerification =
  schemaValidator<SchemaTranscriptEntryVerification>([
    'transcript-entry-verification',
    transcriptEntryVerificationSchema,
  ]);

//
// PUBLIC TYPES
//

export type InvalidEntry = {
  valid: false;
  reason?: 'dishonesty' | 'policy-violation' | 'incorrect' | 'other';
  invalidatedAt: Date;
};

export type ValidEntry = {
  valid: true;
};

export type TranscriptEntryVerification = Record<
  string,
  ValidEntry | InvalidEntry
>;

//
// PUBLIC FUNCTIONS
//

/** Parses unknown model data into a transcript entry verification response. */
export function parseVerification(
  value: unknown,
): TranscriptEntryVerification {
  // Validate and convert the schema data.
  return parseSchema(
    'TranscriptEntryVerification',
    value,
    validateSchemaTranscriptEntryVerification,
    fromSchemaTranscriptEntryVerification,
  );
}

/** Serializes a transcript entry verification response to its model schema representation. */
export function serializeVerification(
  verification: TranscriptEntryVerification,
): object {
  // Convert the domain object to schema data.
  return toSchemaTranscriptEntryVerification(verification);
}

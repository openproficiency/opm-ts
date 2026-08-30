// Project Imports
import transcriptEntrySchema from '../../schemas/transcript-entry.schema.json' with { type: 'json' };
import {
  parseSchema,
  schemaValidator,
} from '../model/schema-registry.js';
import {
  fromSchemaTranscriptEntry,
  toSchemaTranscriptEntry,
} from './conversion.js';
import type { TranscriptEntry as SchemaTranscriptEntry } from './transcript-entry.schema.js';
//

//
// CONSTANTS
//

export const SCORES = [
  'unaware',
  'aware',
  'familiar',
  'competent',
  'fluent',
] as const satisfies readonly Score[];

const validateSchemaTranscriptEntry =
  schemaValidator<SchemaTranscriptEntry>([
    'transcript-entry',
    transcriptEntrySchema,
  ]);

//
// PUBLIC TYPES
//

export type Score =
  | 'unaware'
  | 'aware'
  | 'familiar'
  | 'competent'
  | 'fluent';

export type TranscriptEntry = {
  $schema?: string;
  userEmail: string;
  topic: string;
  topicList: string;
  topicListVersion: string;
  topicListOwner: string;
  topicListSources?: string[];
  score: Score;
  issuedAt: Date;
  validUntil: Date;
  issuedBy: string;
  verificationUrl?: string;
  signature: string | null;
  signedBy: string;
};

//
// PUBLIC FUNCTIONS
//

/** Compares two scores using the proficiency order. */
export function compareScores(left: Score, right: Score): number {
  // Compare the scores by their canonical indexes.
  return scoreIndex(left) - scoreIndex(right);
}

/** Reports whether a value is a recognized score. */
export function isScore(value: unknown): value is Score {
  // Require a string contained in the canonical score list.
  return typeof value === 'string' && SCORES.includes(value as Score);
}

/** Parses unknown model data into a transcript entry. */
export function parse(value: unknown): TranscriptEntry {
  // Validate and convert the schema data.
  return parseSchema(
    'TranscriptEntry',
    value,
    validateSchemaTranscriptEntry,
    fromSchemaTranscriptEntry,
  );
}

/** Returns the zero-based proficiency index for a score. */
export function scoreIndex(score: Score): number {
  // Find the score in the canonical proficiency order.
  return SCORES.indexOf(score);
}

/** Returns the display label for a score. */
export function scoreLabel(score: Score): string {
  // Capitalize the canonical lowercase score.
  return score.charAt(0).toUpperCase() + score.slice(1);
}

/** Serializes a transcript entry to its model schema representation. */
export function serialize(entry: TranscriptEntry): object {
  // Convert the domain object to schema data.
  return toSchemaTranscriptEntry(entry);
}

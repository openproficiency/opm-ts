// Project Imports
import type { TranscriptEntry as SchemaTranscriptEntry } from './transcript-entry.schema.js';
import type { TranscriptEntry } from './transcript-entry.js';
import type { TranscriptEntryVerificationResponse as SchemaTranscriptEntryVerification } from './transcript-entry-verification.schema.js';
import type {
  InvalidEntry,
  TranscriptEntryVerification,
} from './transcript-entry-verification.js';
//

//
// PUBLIC FUNCTIONS
//

/** Converts a schema-format transcript entry to its camelCase representation. */
export function fromSchemaTranscriptEntry(
  entry: SchemaTranscriptEntry,
): TranscriptEntry {
  return omitUndefined({
    $schema: entry.$schema,
    userEmail: entry['user-email'],
    topic: entry.topic,
    topicList: entry['topic-list'],
    topicListVersion: entry['topic-list-version'],
    topicListOwner: entry['topic-list-owner'],
    topicListSources: entry['topic-list-sources'],
    score: entry.score,
    issuedAt: new Date(entry['issued-at']),
    validUntil: new Date(entry['valid-until']),
    issuedBy: entry['issued-by'],
    verificationUrl: entry['verification-url'],
    signature: entry.signature,
    signedBy: entry['signed-by'],
  });
}

/** Converts a schema-format transcript entry verification response to its camelCase representation. */
export function fromSchemaTranscriptEntryVerification(
  verification: SchemaTranscriptEntryVerification,
): TranscriptEntryVerification {
  return mapValues(verification, (entry) =>
    entry.valid ? entry : fromSchemaInvalidEntry(entry),
  );
}

/** Converts a camelCase transcript entry to its schema representation. */
export function toSchemaTranscriptEntry(
  entry: TranscriptEntry,
): SchemaTranscriptEntry {
  return omitUndefined({
    $schema: entry.$schema,
    'user-email': entry.userEmail,
    topic: entry.topic,
    'topic-list': entry.topicList,
    'topic-list-version': entry.topicListVersion,
    'topic-list-owner': entry.topicListOwner,
    'topic-list-sources': entry.topicListSources,
    score: entry.score,
    'issued-at': entry.issuedAt.toISOString(),
    'valid-until': entry.validUntil.toISOString(),
    'issued-by': entry.issuedBy,
    'verification-url': entry.verificationUrl,
    signature: entry.signature,
    'signed-by': entry.signedBy,
  });
}

/** Converts a camelCase transcript entry verification response to its schema representation. */
export function toSchemaTranscriptEntryVerification(
  verification: TranscriptEntryVerification,
): SchemaTranscriptEntryVerification {
  return mapValues(verification, (entry) =>
    entry.valid ? entry : toSchemaInvalidEntry(entry),
  );
}

//
// PRIVATE FUNCTIONS
//

/** Converts a schema-format invalid verification entry to its camelCase representation. */
function fromSchemaInvalidEntry(
  entry: Extract<SchemaTranscriptEntryVerification[string], { valid: false }>,
): InvalidEntry {
  return omitUndefined({
    valid: false as const,
    reason: entry.reason,
    invalidatedAt: new Date(entry['invalidated-at']),
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

/** Converts a camelCase invalid verification entry to its schema representation. */
function toSchemaInvalidEntry(entry: InvalidEntry) {
  return omitUndefined({
    valid: false as const,
    reason: entry.reason,
    'invalidated-at': entry.invalidatedAt.toISOString(),
  });
}

/* Generated from Open Proficiency Model v0.1.0. Do not edit directly. */

/**
 * Response envelope for batch transcript entry verification lookups.
 */
export interface TranscriptEntryVerificationResponse {
  /**
   * This interface was referenced by `TranscriptEntryVerificationResponse`'s JSON-Schema definition
   * via the `patternProperty` "^[a-f0-9]{64}$".
   */
  [k: string]: ValidEntry | InvalidEntry;
}
export interface ValidEntry {
  valid: true;
}
export interface InvalidEntry {
  valid: false;
  /**
   * Issuer provided reason for invalid status.
   */
  reason?: 'dishonesty' | 'policy-violation' | 'incorrect' | 'other';
  /**
   * ISO 8601 timestamp indicating when validity ended.
   */
  'invalidated-at': string;
}

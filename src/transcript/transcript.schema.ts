/* Generated from Open Proficiency Model v0.1.0. Do not edit directly. */

/**
 * A collection of transcript entries representing a user's proficiency across multiple topics.
 */
export type Transcript = TranscriptEntry[];

/**
 * A permanent record of a user's proficiency score for a single topic.
 */
export interface TranscriptEntry {
  /**
   * JSON Schema version
   */
  $schema?: string;
  /**
   * The user's email address to act as a unique identifier. Ex: 'user@example.com'
   */
  'user-email': string;
  /**
   * The topic identifier for which proficiency is being recorded. Kebab case. Ex: 'addition'
   */
  topic: string;
  /**
   * Name of the topic list that defines the topic. Kebab case. Ex: 'math'
   */
  'topic-list': string;
  /**
   * Version of the topic list. Semantic versioning format. Ex: '1.0.0'
   */
  'topic-list-version': string;
  /**
   * Domain name of the entity that maintains the topic list. Ex: 'example.com'
   */
  'topic-list-owner': string;
  /**
   * Optional list of URLs where the topic list is hosted. The issuer's original is recommended first.
   */
  'topic-list-sources'?: string[];
  /**
   * The degree of proficiency for a specific topic. [unaware, aware, familiar, competent, fluent]
   */
  score: 'unaware' | 'aware' | 'familiar' | 'competent' | 'fluent';
  /**
   * ISO 8601 timestamp of when this topic's score was recorded.
   */
  'issued-at': string;
  /**
   * ISO 8601 timestamp of when this topic's score expires.
   */
  'valid-until': string;
  /**
   * Domain name of the entity that issued this transcript entry. Ex: 'example.com'
   */
  'issued-by': string;
  /**
   * HTTPS URL to the issuer verification API endpoint. Used for additional confirmation of this transcript entry.
   */
  'verification-url'?: string;
  /**
   * ASCII-armored detached OpenPGP (GPG) signature over the protected fields of this transcript entry, used to verify authenticity.
   */
  signature: string | null;
  /**
   * Email address of the GPG key that produced 'signature'. For convenience only. Verify with signature. Convention: 'proficiency@<owner>'.
   */
  'signed-by': string;
}

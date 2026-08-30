/* Generated from Open Proficiency Model v0.1.0. Do not edit directly. */

/**
 * A collection of topics that define a knowledge domain declared by a particular issuer.
 */
export interface TopicList {
  /**
   * JSON Schema version
   */
  $schema?: string;
  /**
   * The entity that maintains this topic list. Domain name. Ex: 'example.com'
   */
  owner: string;
  /**
   * A name to define scope for this topic list. Kebab case. Ex: 'my-list-name'
   */
  name: string;
  /**
   * A brief description of the knowledge domain covered by this topic list.
   */
  description: string;
  /**
   * Version of this topic list. Semantic versioning format. Ex: '1.0.0'
   */
  version: string;
  /**
   * ISO 8601 timestamp of when this version was created.
   */
  'issued-at': string;
  /**
   * ASCII-armored detached OpenPGP (GPG) signature over the protected fields of this topic list, used to verify authenticity.
   */
  signature: string | null;
  /**
   * Email address of the GPG key that produced 'signature'. For convenience only. Verify with signature. Convention: 'proficiency@<owner>'.
   */
  'signed-by': string | null;
  /**
   * Map of topic identifiers to their definitions
   */
  topics: {
    [k: string]: Topic;
  };
  /**
   * Map of shorthand aliases to external topic list references
   */
  dependencies?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*$".
     */
    [k: string]:
      | string
      | {
          /**
           * The owner of the referenced topic list. Domain name. Ex: 'example.com'
           */
          'topic-list-owner': string;
          /**
           * The name of the referenced topic list. Kebab case. Ex: 'math'
           */
          'topic-list-name': string;
          /**
           * The version of the referenced topic list. Semantic versioning format. Ex: '0.1.0'
           */
          'topic-list-version': string;
          /**
           * Optional list of exact HTTP(S) URLs where this topic list version can be retrieved. Removes dependency on any registry. Not included in the issuer's signature verification, so it may be amended by redistributors without invalidating the signature.
           */
          locations?: string[];
        };
  };
}
/**
 * A defined unique area of knowledge
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*$".
 */
export interface Topic {
  /**
   * JSON Schema version
   */
  $schema?: string;
  /**
   * Unique identifier for this topic within its topic list. Kebab case. Ex: 'my-topic-id'
   */
  id?: string;
  /**
   * Optional human-friendly name for this topic.
   */
  'display-name'?: string;
  /**
   * A brief explanation of the knowledge represented by this topic. Max 100 characters.
   */
  description: string;
  /**
   * HTTP(S) URL to a reference that explains this topic.
   */
  'docs-url'?: string;
  /**
   * The suggested validity period when assigning a score to this topic. Min 30 days. Default is 732 days (~2 years).
   */
  'validity-period'?: number;
  /**
   * List of topics that directly represent proficiency in a subspace of this topic.
   */
  subtopics?: (string | Topic)[];
  /**
   * List of topics required as prerequisites before beginning to obtain proficiency in this topic.
   *
   * Items: Reference to a topic identifier or external topic (e.g., 'namespace.topic-id')
   */
  pretopics?: string[];
}

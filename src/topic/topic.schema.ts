/* Generated from Open Proficiency Model v0.1.0. Do not edit directly. */

/**
 * A defined unique area of knowledge
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

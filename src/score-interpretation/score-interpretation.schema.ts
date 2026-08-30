/* Generated from Open Proficiency Model v0.1.0. Do not edit directly. */

/**
 * A standardized interpretation of a set of topic scores, typically one of several in a score interpretation list.
 */
export interface ScoreInterpretation {
  /**
   * JSON Schema version
   */
  $schema?: string;
  /**
   * Unique identifier for this score interpretation. Kebab case. Ex: 'my-interpretation-id'
   */
  id?: string;
  /**
   * A friendly name used for display
   */
  name: string;
  /**
   * A brief explanation of this score interpretation
   */
  description: string;
  requirements: RequirementsExpression;
}
/**
 * A logical expression of topics and required scores for this interpretation. Supports logical operators (all, any, at-least-N) for composing requirements. A flat topic-score map is treated as implicit 'all'. Operators may have a unique identifier suffix (e.g., 'all-abc1', 'any-abc2', 'at-least-3-abc3'). Topic keys always contain a dot (dependency.topic) so they cannot conflict with operator keywords.
 */
export interface RequirementsExpression {
  /**
   * Score level required for the topic
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   *
   * This interface was referenced by `RequirementsExpression1`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   *
   * This interface was referenced by `RequirementsExpression`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   */
  [k: string]: RequirementsExpression1 | RequirementsExpression2 | RequirementsExpression3 | string;
}
/**
 * All expressions must be satisfied. Each entry in the value is a separate operand.
 *
 * This interface was referenced by `RequirementsExpression`'s JSON-Schema definition
 * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
 */
export interface RequirementsExpression1 {
  /**
   * This interface was referenced by `RequirementsExpression1`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * Score level required for the topic
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   *
   * This interface was referenced by `RequirementsExpression1`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   */
  [k: string]: RequirementsExpression1 | RequirementsExpression2 | RequirementsExpression3 | string;
}
/**
 * At least one expression must be satisfied. Each entry in the value is a separate operand.
 *
 * This interface was referenced by `RequirementsExpression1`'s JSON-Schema definition
 * via the `patternProperty` "^any(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
 *
 * This interface was referenced by `RequirementsExpression`'s JSON-Schema definition
 * via the `patternProperty` "^any(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
 */
export interface RequirementsExpression2 {
  /**
   * This interface was referenced by `RequirementsExpression1`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^any(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^any(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * Score level required for the topic
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   */
  [k: string]: RequirementsExpression1 | RequirementsExpression2 | RequirementsExpression3 | string;
}
/**
 * At least N expressions must be satisfied, where N is encoded in the operator name. Each entry in the value is a separate operand.
 *
 * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
 * via the `patternProperty` "^at-least-[1-9][0-9]*(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
 *
 * This interface was referenced by `RequirementsExpression1`'s JSON-Schema definition
 * via the `patternProperty` "^at-least-[1-9][0-9]*(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
 *
 * This interface was referenced by `RequirementsExpression`'s JSON-Schema definition
 * via the `patternProperty` "^at-least-[1-9][0-9]*(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
 */
export interface RequirementsExpression3 {
  /**
   * This interface was referenced by `RequirementsExpression1`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^all(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression2`'s JSON-Schema definition
   * via the `patternProperty` "^any(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^any(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^at-least-[1-9][0-9]*(-[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$".
   *
   * Score level required for the topic
   *
   * This interface was referenced by `RequirementsExpression3`'s JSON-Schema definition
   * via the `patternProperty` "^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$".
   */
  [k: string]: RequirementsExpression1 | RequirementsExpression2 | RequirementsExpression3 | string;
}

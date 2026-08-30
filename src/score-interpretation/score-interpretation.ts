// Project Imports
import scoreInterpretationSchema from '../../schemas/score-interpretation.schema.json' with { type: 'json' };
import {
  parseSchema,
  schemaValidator,
} from '../model/schema-registry.js';
import type { ScoreInterpretation as SchemaScoreInterpretation } from './score-interpretation.schema.js';
//

//
// CONSTANTS
//

const validateSchemaScoreInterpretation =
  schemaValidator<SchemaScoreInterpretation>([
    'score-interpretation',
    scoreInterpretationSchema,
  ]);

//
// PUBLIC TYPES
//

export type RequirementsExpression = {
  [key: string]: string | RequirementsExpression;
};

export type ScoreInterpretation = {
  $schema?: string;
  id?: string;
  name: string;
  description: string;
  requirements: RequirementsExpression;
};

//
// PUBLIC FUNCTIONS
//

/** Parses unknown model data into a score interpretation. */
export function parse(value: unknown): ScoreInterpretation {
  // Validate the schema data, which already matches the domain type.
  return parseSchema(
    'ScoreInterpretation',
    value,
    validateSchemaScoreInterpretation,
    (interpretation) => interpretation,
  );
}

/** Serializes a score interpretation to its model schema representation. */
export function serialize(interpretation: ScoreInterpretation): object {
  // Return the schema-compatible domain object.
  return interpretation;
}

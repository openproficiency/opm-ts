// Project Imports
import scoreInterpretationListSchema from '../../schemas/score-interpretation-list.schema.json' with { type: 'json' };
import scoreInterpretationSchema from '../../schemas/score-interpretation.schema.json' with { type: 'json' };
import {
  parseSchema,
  schemaValidator,
} from '../model/schema-registry.js';
import type { ScoreInterpretation } from '../score-interpretation/score-interpretation.js';
import {
  fromSchemaScoreInterpretationList,
  toSchemaScoreInterpretationList,
} from './conversion.js';
import type { ScoreInterpretationList as SchemaScoreInterpretationList } from './score-interpretation-list.schema.js';
//

//
// CONSTANTS
//

const validateSchemaScoreInterpretationList =
  schemaValidator<SchemaScoreInterpretationList>(
    ['score-interpretation-list', scoreInterpretationListSchema],
    [['score-interpretation', scoreInterpretationSchema]],
  );

//
// PUBLIC TYPES
//

export type ScoreInterpretationList = {
  $schema?: string;
  owner: string;
  name: string;
  description: string;
  version: string;
  issuedAt: Date;
  signature: string | null;
  signedBy: string | null;
  scoreInterpretations: Record<string, ScoreInterpretation>;
  dependencies?: Record<string, string>;
};

export type KeyedScoreInterpretation = {
  id: string;
  interpretation: ScoreInterpretation;
};

//
// PUBLIC FUNCTIONS
//

/** Lists score interpretations with the identifiers used as their map keys. */
export function entries(
  list: ScoreInterpretationList,
): KeyedScoreInterpretation[] {
  // Attach each interpretation's map key without changing the interpretation.
  return Object.entries(list.scoreInterpretations).map(
    ([id, interpretation]) => ({ id, interpretation }),
  );
}

/** Returns the score interpretation list's fully qualified owner/name@version. */
export function fullyQualifiedName(list: ScoreInterpretationList): string {
  return `${list.owner}/${list.name}@${list.version}`;
}

/** Parses unknown model data into a score interpretation list. */
export function parse(value: unknown): ScoreInterpretationList {
  // Validate and convert the schema data.
  return parseSchema(
    'ScoreInterpretationList',
    value,
    validateSchemaScoreInterpretationList,
    fromSchemaScoreInterpretationList,
  );
}

/** Serializes a score interpretation list to its model schema representation. */
export function serialize(list: ScoreInterpretationList): object {
  // Convert the domain object to schema data.
  return toSchemaScoreInterpretationList(list);
}

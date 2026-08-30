// Project Imports
import type { ScoreInterpretationList as SchemaScoreInterpretationList } from './score-interpretation-list.schema.js';
import type { ScoreInterpretationList } from './score-interpretation-list.js';
//

//
// PUBLIC FUNCTIONS
//

/** Converts a schema-format score interpretation list to its camelCase representation. */
export function fromSchemaScoreInterpretationList(
  list: SchemaScoreInterpretationList,
): ScoreInterpretationList {
  return omitUndefined({
    $schema: list.$schema,
    owner: list.owner,
    name: list.name,
    description: list.description,
    version: list.version,
    issuedAt: new Date(list['issued-at']),
    signature: list.signature,
    signedBy: list['signed-by'],
    scoreInterpretations: list['score-interpretations'],
    dependencies: list.dependencies,
  });
}

/** Converts a camelCase score interpretation list to its schema representation. */
export function toSchemaScoreInterpretationList(
  list: ScoreInterpretationList,
): SchemaScoreInterpretationList {
  return omitUndefined({
    $schema: list.$schema,
    owner: list.owner,
    name: list.name,
    description: list.description,
    version: list.version,
    'issued-at': list.issuedAt.toISOString(),
    signature: list.signature,
    'signed-by': list.signedBy,
    'score-interpretations': list.scoreInterpretations,
    dependencies: list.dependencies,
  });
}

//
// PRIVATE FUNCTIONS
//

/** Removes properties whose value is undefined. */
function omitUndefined<T extends object>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as T;
}

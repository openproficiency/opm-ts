//
// CONSTANTS
//

export { SCORES } from './transcript-entry.js';

//
// PUBLIC TYPES
//

export type { Score, TranscriptEntry } from './transcript-entry.js';
export type {
  InvalidEntry,
  TranscriptEntryVerification,
  ValidEntry,
} from './transcript-entry-verification.js';

//
// PUBLIC FUNCTIONS
//

export {
  compareScores,
  isScore,
  parse,
  scoreIndex,
  scoreLabel,
  serialize,
} from './transcript-entry.js';
export {
  parseVerification,
  serializeVerification,
} from './transcript-entry-verification.js';

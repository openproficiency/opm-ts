# API reference

The package root exports seven namespaces:

```ts
import {
  Model,
  ScoreInterpretation,
  ScoreInterpretationList,
  Topic,
  TopicList,
  Transcript,
  TranscriptEntry,
} from '@openproficiency/typescript';
```

Every model primitive has a matching `parse(value: unknown)` and `serialize`
function. Parsing validates model-shaped data and returns a domain object.
Serialization converts a domain object to a plain model-shaped object.

## Areas and subpaths

| Root namespace | Direct subpath |
| --- | --- |
| `Topic` | `@openproficiency/typescript/topic` |
| `TopicList` | `@openproficiency/typescript/topic-list` |
| `ScoreInterpretation` | `@openproficiency/typescript/score-interpretation` |
| `ScoreInterpretationList` | `@openproficiency/typescript/score-interpretation-list` |
| `Transcript` | `@openproficiency/typescript/transcript` |
| `TranscriptEntry` | `@openproficiency/typescript/transcript-entry` |
| `Model` | `@openproficiency/typescript/model` |

Direct subpaths export their members at the top level:

```ts
import {
  parse,
  type TopicList,
} from '@openproficiency/typescript/topic-list';
```

## `Topic`

| Export | Kind | Description |
| --- | --- | --- |
| `Topic` | Type | One area of knowledge, including optional subtopics and prerequisites. |
| `parse` | Function | Validates unknown topic data and returns a `Topic`. |
| `serialize` | Function | Converts a `Topic` to its model representation. |

## `TopicList`

| Export | Kind | Description |
| --- | --- | --- |
| `TopicList` | Type | A versioned, signed collection of keyed topics. |
| `KeyedTopic` | Type | A topic paired with the ID used as its map key. |
| `TopicListDependency` | Type | A shorthand or structured topic-list dependency. |
| `TopicListDependencyDetails` | Type | The structured form of a topic-list dependency. |
| `DependencyTopic` | Type | A dependency alias and topic identifier. |
| `parse` | Function | Validates unknown topic-list data and returns a `TopicList`. |
| `serialize` | Function | Converts a `TopicList` to its model representation. |
| `entries` | Function | Returns topics paired with their map keys. |
| `parseDependency` | Function | Parses `owner/name@version`; returns `null` when invalid. |
| `formatDependency` | Function | Formats structured dependency details. |
| `parseDependencyTopic` | Function | Parses `dependency.topic`; returns `null` when invalid. |
| `formatDependencyTopic` | Function | Formats a dependency-qualified topic ID. |

## `ScoreInterpretation`

| Export | Kind | Description |
| --- | --- | --- |
| `ScoreInterpretation` | Type | A named set of topic-score requirements. |
| `RequirementsExpression` | Type | A nested requirements expression. |
| `parse` | Function | Validates unknown interpretation data. |
| `serialize` | Function | Converts an interpretation to its model representation. |

## `ScoreInterpretationList`

| Export | Kind | Description |
| --- | --- | --- |
| `ScoreInterpretationList` | Type | A versioned, signed collection of keyed interpretations. |
| `KeyedScoreInterpretation` | Type | An interpretation paired with its map key. |
| `parse` | Function | Validates unknown interpretation-list data. |
| `serialize` | Function | Converts an interpretation list to its model representation. |
| `entries` | Function | Returns interpretations paired with their map keys. |

## `TranscriptEntry`

| Export | Kind | Description |
| --- | --- | --- |
| `TranscriptEntry` | Type | One issuer's proficiency claim for one user and topic. |
| `Score` | Type | One of the five canonical proficiency scores. |
| `SCORES` | Constant | The proficiency scale from `unaware` to `fluent`. |
| `parse` | Function | Validates unknown transcript-entry data. |
| `serialize` | Function | Converts a transcript entry to its model representation. |
| `compareScores` | Function | Compares two scores in proficiency order. |
| `isScore` | Function | Type guard for canonical score values. |
| `scoreIndex` | Function | Returns a score's zero-based proficiency index. |
| `scoreLabel` | Function | Returns a capitalized display label. |
| `TranscriptEntryVerification` | Type | Verification results keyed by signature hash. |
| `ValidEntry` | Type | A valid verification result. |
| `InvalidEntry` | Type | An invalid verification result with time and optional reason. |
| `parseVerification` | Function | Validates an unknown verification response. |
| `serializeVerification` | Function | Converts a verification response to its model representation. |

## `Transcript`

| Export | Kind | Description |
| --- | --- | --- |
| `Transcript` | Type | An array of transcript entries. |
| `parse` | Function | Validates unknown transcript data. |
| `serialize` | Function | Converts a transcript to its model representation. |

## `Model`

| Export | Description |
| --- | --- |
| `OPEN_PROFICIENCY_MODEL_VERSION` | Supported Open Proficiency Model version. |
| `OPEN_PROFICIENCY_MODEL_COMMIT` | Exact upstream commit used for the vendored schemas. |

## Raw schema subpaths

Raw schemas retain the Open Proficiency Model's original field names and
structure:

| Subpath |
| --- |
| `@openproficiency/typescript/schemas/topic.json` |
| `@openproficiency/typescript/schemas/topic-list.json` |
| `@openproficiency/typescript/schemas/score-interpretation.json` |
| `@openproficiency/typescript/schemas/score-interpretation-list.json` |
| `@openproficiency/typescript/schemas/transcript-entry.json` |
| `@openproficiency/typescript/schemas/transcript.json` |
| `@openproficiency/typescript/schemas/transcript-entry-verification.json` |

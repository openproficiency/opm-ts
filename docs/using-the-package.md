# Using the package

`@openproficiency/typescript` turns unknown Open Proficiency Model data into
typed domain objects and turns those objects back into the model's JSON shape.

## Parse model data

Parse JSON text with the platform, then pass the unknown value to the
appropriate package area:

```ts
import { TopicList } from '@openproficiency/typescript';

export function parseTopicList(json: string): TopicList.TopicList {
  const data: unknown = JSON.parse(json);

  return TopicList.parse(data);
}
```

Parsing validates the complete value against the vendored Open Proficiency
Model schema. Invalid input throws `TypeError`. The returned topic list's
`issuedAt` value is a `Date`, and nested topics have camelCase properties such
as `displayName`.

Model documents use kebab-case fields and ISO date-time strings. Parsed domain
objects use camelCase fields and `Date` values:

| Model data | Domain object |
| --- | --- |
| `issued-at` | `issuedAt` |
| `signed-by` | `signedBy` |
| `"2026-01-01T00:00:00.000Z"` | `new Date('2026-01-01T00:00:00.000Z')` |

Dynamic keys are data, so they do not change. Topic IDs, interpretation IDs,
requirement keys, and verification signature hashes stay exactly as written.

## Create and serialize a domain object

Use `satisfies` to check an object without widening its inferred type:

```ts
import { TopicList } from '@openproficiency/typescript';

const topicList = {
  owner: 'example.com',
  name: 'math',
  description: 'Basic mathematics.',
  version: '0.1.0',
  issuedAt: new Date('2026-01-01T00:00:00Z'),
  signature: null,
  signedBy: null,
  topics: {
    addition: {
      displayName: 'Addition',
      description: 'Combining two values.',
    },
  },
} satisfies TopicList.TopicList;
```

Serialize the domain object before passing it to `JSON.stringify`:

```ts
const json = JSON.stringify(TopicList.serialize(topicList), null, 2);
```

The serialized value uses model field names and ISO date-time strings. An
invalid `Date` throws `RangeError` during serialization.

## Work with transcript entries

Transcript entries use the model's canonical proficiency scale:

```ts
import { TranscriptEntry } from '@openproficiency/typescript';

const entry = {
  userEmail: 'learner@example.com',
  topic: 'addition',
  topicList: 'math',
  topicListVersion: '0.1.0',
  topicListOwner: 'example.com',
  score: 'competent',
  issuedAt: new Date('2026-01-01T00:00:00Z'),
  validUntil: new Date('2028-01-01T00:00:00Z'),
  issuedBy: 'example.com',
  signature: null,
  signedBy: 'proficiency@example.com',
} satisfies TranscriptEntry.TranscriptEntry;

TranscriptEntry.scoreLabel(entry.score); // 'Competent'
TranscriptEntry.compareScores(entry.score, 'familiar'); // > 0
TranscriptEntry.isScore('expert'); // false
```

`TranscriptEntry.SCORES` contains the complete scale from lowest to highest.

## Enumerate keyed documents

Topic lists and score interpretation lists store IDs as object keys. Use
`entries` when array operations are more convenient:

```ts
const topics = TopicList.entries(topicList);

// [{ id: 'addition', topic: { displayName: 'Addition', ... } }]
```

The helper derives each `id` without modifying the source document.

## Parse dependency identifiers

`TopicList` can parse and format dependency identifiers. These helpers only
work with identifier strings; they do not fetch or resolve dependencies:

```ts
import { TopicList } from '@openproficiency/typescript';

TopicList.parseDependency('example.com/math@0.1.0');
// { topicListOwner: 'example.com', topicListName: 'math', topicListVersion: '0.1.0' }

TopicList.formatDependency({
  topicListOwner: 'example.com',
  topicListName: 'math',
  topicListVersion: '0.1.0',
});
// 'example.com/math@0.1.0'

TopicList.parseDependencyTopic('math.addition');
// { dependency: 'math', topic: 'addition' }
```

The parse helpers return `null` for malformed identifiers.

## Import only one area

Root imports are convenient:

```ts
import { TopicList } from '@openproficiency/typescript';
```

Use a direct subpath when an application only needs one area loaded:

```ts
import * as TopicList from '@openproficiency/typescript/topic-list';
```

All supported subpaths are listed in the [API reference](api-reference.md).

## Use the raw schemas

Each vendored JSON Schema is also available as a package subpath:

```ts
import topicSchema from '@openproficiency/typescript/schemas/topic.json' with {
  type: 'json',
};
```

Use the package's `parse` functions for normal application validation. Raw
schemas are available for editors, schema-aware tooling, and consumers that
need a different validator.

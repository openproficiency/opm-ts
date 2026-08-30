# @openproficiency/typescript

TypeScript types and validation for
[Open Proficiency Model](https://github.com/openproficiency/model) `v0.1.0`.

- Topic Lists
- Score Interpretations
- Transcripts

## Install

```bash
npm install @openproficiency/typescript
```

## How to use

Validate and convert an unknown JSON object to a typed object.

<!-- prettier-ignore -->
```ts
import { TopicList } from "@openproficiency/typescript";

const topicList = TopicList.parse({
  "owner": "example.com",
  "name": "math",
  "description": "Basic mathematics.",
  "version": "0.1.0",
  "issued-at": "2026-01-01T00:00:00Z",
  "signature": null,
  "signed-by": null,
  "topics": {},
});

console.log(`${topicList.owner}/${topicList.name}`); // example.com/math
```

Create typed data directly and serialize it when you need the model's JSON
shape:

```ts
import { TopicList } from "@openproficiency/typescript";

const topicList = {
  owner: "example.com",
  name: "math",
  description: "Basic mathematics.",
  version: "0.1.0",
  issuedAt: new Date("2026-01-01T00:00:00Z"),
  signature: null,
  signedBy: null,
  topics: {
    addition: {
      displayName: "Addition",
      description: "Combining two values.",
    },
  },
} satisfies TopicList.TopicList;

const json = JSON.stringify(TopicList.serialize(topicList));
```

### Public API

Import an area from the package root. Every model primitive provides a type,
`parse`, and `serialize`.

| Area                      | Use it for                                               |
| ------------------------- | -------------------------------------------------------- |
| `Topic`                   | Declaring one small unique area of knowledge             |
| `TopicList`               | Bundling many topics into a collection, for distribution |
| `TranscriptEntry`         | Issuing a topic score for 1 user, for distribution.      |
| `Transcript`              | Bundling many transcript entries together for a user     |
| `ScoreInterpretation`     | Defining a friendly name for a collection of scores      |
| `ScoreInterpretationList` | Bundling many interpretations together, for distribution |
| `Model`                   | Verifying the supported proficiency model version        |

```ts
import { Model } from "@openproficiency/typescript";

Model.OPEN_PROFICIENCY_MODEL_VERSION; // 'v0.1.0'
```

## How to develop

- [Develop locally](docs/how-to-develop.md)
- [Publish the package](docs/publishing.md)

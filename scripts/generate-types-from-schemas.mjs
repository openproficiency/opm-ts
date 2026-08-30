import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'json-schema-to-typescript';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const check = process.argv.includes('--check');
const schemasDirectory = join(root, 'schemas');
const sourceDirectory = join(root, 'src');
const upstreamSchemaPrefix =
  'https://raw.githubusercontent.com/openproficiency/model/refs/heads/main/schemas/';

const schemas = [
  ['topic.schema.json', 'Topic', 'topic/topic.schema.ts'],
  ['topic-list.schema.json', 'TopicList', 'topic-list/topic-list.schema.ts'],
  [
    'score-interpretation.schema.json',
    'ScoreInterpretation',
    'score-interpretation/score-interpretation.schema.ts',
  ],
  [
    'score-interpretation-list.schema.json',
    'ScoreInterpretationList',
    'score-interpretation-list/score-interpretation-list.schema.ts',
  ],
  [
    'transcript-entry.schema.json',
    'TranscriptEntry',
    'transcript-entry/transcript-entry.schema.ts',
  ],
  ['transcript.schema.json', 'Transcript', 'transcript/transcript.schema.ts'],
  [
    'transcript-entry-verification.schema.json',
    'TranscriptEntryVerification',
    'transcript-entry/transcript-entry-verification.schema.ts',
  ],
];

const localSchemasDirectory = await mkdtemp(
  join(tmpdir(), 'open-proficiency-typescript-'),
);

try {
  for (const [fileName] of schemas) {
    const schemaSource = await readFile(
      join(schemasDirectory, fileName),
      'utf8',
    );
    const localSchemaSource = schemaSource
      .replaceAll(upstreamSchemaPrefix, '')
      .replaceAll(
        '"$ref": "requirements-expression"',
        '"$ref": "#/properties/requirements"',
      );

    await writeFile(join(localSchemasDirectory, fileName), localSchemaSource);
  }

  for (const [fileName, typeName, outputName] of schemas) {
    const schemaSource = await readFile(
      join(localSchemasDirectory, fileName),
      'utf8',
    );
    const generated = await compile(JSON.parse(schemaSource), typeName, {
      bannerComment:
        '/* Generated from Open Proficiency Model v0.1.0. Do not edit directly. */',
      cwd: localSchemasDirectory,
      style: {
        singleQuote: true,
      },
    });
    const outputPath = join(sourceDirectory, outputName);

    if (check) {
      const current = await readFile(outputPath, 'utf8');
      if (current !== generated) {
        console.error(`${outputName} is not generated from the current schemas.`);
        process.exitCode = 1;
      }
    } else {
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, generated);
    }
  }
} finally {
  await rm(localSchemasDirectory, { recursive: true });
}

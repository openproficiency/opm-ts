// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { TranscriptEntry } from '../../src/index.js';
//

//
// TESTS
//

describe('TranscriptEntry.compareScores', () => {
  it('compares scores by proficiency', () => {
    // Description
    // Verifies lower scores sort before higher scores.

    // Arrange
    const lower = 'familiar';
    const higher = 'fluent';

    // Act
    const actual = TranscriptEntry.compareScores(lower, higher);

    // Assert
    assert.ok(actual < 0);
  });
});

describe('TranscriptEntry.isScore', () => {
  it('recognizes a model score', () => {
    // Description
    // Verifies that the score guard accepts a canonical model value.

    // Arrange
    const candidate: unknown = 'competent';

    // Act
    const actual = TranscriptEntry.isScore(candidate);

    // Assert
    assert.equal(actual, true);
  });

  it('rejects a value outside the model score scale', () => {
    // Description
    // Verifies that the score guard rejects an unsupported level.

    // Arrange
    const candidate: unknown = 'expert';

    // Act
    const actual = TranscriptEntry.isScore(candidate);

    // Assert
    assert.equal(actual, false);
  });
});

describe('TranscriptEntry.parse', () => {
  it('parses a transcript entry', () => {
    // Description
    // Verifies valid model data produces a transcript entry.

    // Arrange
    const candidate: unknown = {
      'user-email': 'learner@example.com',
      'topic': 'addition',
      'topic-list': 'math',
      'topic-list-version': '0.1.0',
      'topic-list-owner': 'example.com',
      'score': 'competent',
      'issued-at': '2026-01-01T00:00:00.000Z',
      'valid-until': '2028-01-01T00:00:00.000Z',
      'issued-by': 'example.com',
      'signature': null,
      'signed-by': 'proficiency@example.com',
    };

    // Act
    const actual = TranscriptEntry.parse(candidate);

    // Assert
    assert.equal(actual.score, 'competent');
  });

  it('rejects an invalid transcript entry', () => {
    // Description
    // Verifies unsupported score values fail model validation.

    // Arrange
    const candidate: unknown = {
      'user-email': 'learner@example.com',
      'topic': 'addition',
      'topic-list': 'math',
      'topic-list-version': '0.1.0',
      'topic-list-owner': 'example.com',
      'score': 'expert',
      'issued-at': '2026-01-01T00:00:00.000Z',
      'valid-until': '2028-01-01T00:00:00.000Z',
      'issued-by': 'example.com',
      'signature': null,
      'signed-by': 'proficiency@example.com',
    };
    const parse = () => TranscriptEntry.parse(candidate);

    // Act
    const actual = parse;

    // Assert
    assert.throws(actual, TypeError);
  });
});

describe('TranscriptEntry.scoreIndex', () => {
  it('indexes scores by proficiency', () => {
    // Description
    // Verifies the canonical lowest-to-highest score order.

    // Arrange
    const unaware = 'unaware';
    const aware = 'aware';
    const familiar = 'familiar';
    const competent = 'competent';
    const fluent = 'fluent';

    // Act
    const actual = [
      TranscriptEntry.scoreIndex(unaware),
      TranscriptEntry.scoreIndex(aware),
      TranscriptEntry.scoreIndex(familiar),
      TranscriptEntry.scoreIndex(competent),
      TranscriptEntry.scoreIndex(fluent),
    ];

    // Assert
    assert.deepEqual(actual, [0, 1, 2, 3, 4]);
  });
});

describe('TranscriptEntry.scoreLabel', () => {
  it('formats a score for display', () => {
    // Description
    // Verifies that a score receives the expected human-readable label.

    // Arrange
    const score = 'aware';

    // Act
    const actual = TranscriptEntry.scoreLabel(score);

    // Assert
    assert.equal(actual, 'Aware');
  });
});

describe('TranscriptEntry.serialize', () => {
  it('serializes date-time fields to ISO strings', () => {
    // Description
    // Verifies Date values become ISO date-time strings and fields are renamed.

    // Arrange
    const input = {
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

    // Act
    const actual = TranscriptEntry.serialize(input) as Record<string, unknown>;

    // Assert
    assert.equal(actual['issued-at'], '2026-01-01T00:00:00.000Z');
    assert.equal(actual['valid-until'], '2028-01-01T00:00:00.000Z');
    assert.equal('issuedAt' in actual, false);
  });
});

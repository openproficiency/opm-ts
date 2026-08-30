// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { Transcript } from '../../src/index.js';
//

//
// TESTS
//

describe('Transcript.parse', () => {
  it('parses a transcript', () => {
    // Description
    // Verifies valid model data produces a transcript.

    // Arrange
    const candidate: unknown = [
      {
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
      },
    ];

    // Act
    const actual = Transcript.parse(candidate);

    // Assert
    assert.ok(actual[0].issuedAt instanceof Date);
  });

  it('rejects an invalid transcript', () => {
    // Description
    // Verifies malformed transcript entries fail model validation.

    // Arrange
    const candidate: unknown = [{}];
    const parse = () => Transcript.parse(candidate);

    // Act
    const actual = parse;

    // Assert
    assert.throws(actual, TypeError);
  });
});

describe('Transcript.serialize', () => {
  it('serializes transcript date-time fields', () => {
    // Description
    // Verifies transcript Date values become ISO date-time strings.

    // Arrange
    const domainInput = [
      {
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
      },
    ] satisfies Transcript.Transcript;

    // Act
    const encoded = Transcript.serialize(domainInput) as Array<
      Record<string, unknown>
    >;
    const decoded = Transcript.parse(encoded);

    // Assert
    assert.equal(encoded[0]['issued-at'], '2026-01-01T00:00:00.000Z');
    assert.equal(encoded[0]['valid-until'], '2028-01-01T00:00:00.000Z');
    assert.ok(decoded[0].issuedAt instanceof Date);
    assert.ok(decoded[0].validUntil instanceof Date);
  });
});

// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { TranscriptEntry } from '../../src/index.js';
//

//
// TESTS
//

describe('TranscriptEntry.parseVerification', () => {
  it('parses a transcript entry verification response', () => {
    // Description
    // Verifies valid model data produces a verification response.

    // Arrange
    const candidate: unknown = {
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa': {
        'valid': true,
      },
    };

    // Act
    const actual = TranscriptEntry.parseVerification(candidate);

    // Assert
    assert.equal(Object.values(actual)[0].valid, true);
  });

  it('rejects an invalid transcript entry verification response', () => {
    // Description
    // Verifies verification keys must be SHA-256 hashes.

    // Arrange
    const candidate: unknown = { 'abc123': { 'valid': true } };
    const parse = () => TranscriptEntry.parseVerification(candidate);

    // Act
    const actual = parse;

    // Assert
    assert.throws(actual, TypeError);
  });
});

describe('TranscriptEntry.serializeVerification', () => {
  it('serializes verification dates without changing hash keys', () => {
    // Description
    // Verifies verification map keys remain opaque during serialization.

    // Arrange
    const hash =
      'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
    const domainInput = {
      [hash]: {
        valid: false as const,
        reason: 'incorrect' as const,
        invalidatedAt: new Date('2026-02-01T00:00:00Z'),
      },
    };

    // Act
    const encoded = TranscriptEntry.serializeVerification(
      domainInput,
    ) as Record<string, { valid: boolean; 'invalidated-at': string }>;
    const decoded = TranscriptEntry.parseVerification(encoded);

    // Assert
    assert.equal(encoded[hash]['invalidated-at'], '2026-02-01T00:00:00.000Z');
    assert.equal(
      decoded[hash].valid ? null : decoded[hash].invalidatedAt.toISOString(),
      '2026-02-01T00:00:00.000Z',
    );
  });
});

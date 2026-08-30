// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { TopicList } from '../../src/index.js';
//

//
// TESTS
//

describe('TopicList.parse', () => {
  it('parses a topic list', () => {
    // Description
    // Verifies valid model data produces a topic list.

    // Arrange
    const candidate: unknown = {
      'owner': 'example.com',
      'name': 'math',
      'description': 'Basic mathematics.',
      'version': '0.1.0',
      'issued-at': '2026-01-01T00:00:00.000Z',
      'signature': null,
      'signed-by': null,
      'topics': {
        'addition': {
          'display-name': 'Addition',
          'description': 'Combining two values.',
        },
      },
      'dependencies': {
        'numbers': {
          'topic-list-owner': 'example.com',
          'topic-list-name': 'numbers',
          'topic-list-version': '0.1.0',
        },
        'geometry': 'example.com/geometry@0.1.0',
      },
    };

    // Act
    const actual = TopicList.parse(candidate);

    // Assert
    assert.ok(actual.issuedAt instanceof Date);
    assert.equal(actual.issuedAt.toISOString(), '2026-01-01T00:00:00.000Z');
    assert.equal(actual.topics.addition.displayName, 'Addition');
  });

  it('rejects an invalid topic list', () => {
    // Description
    // Verifies missing topic-list fields fail model validation.

    // Arrange
    const candidate: unknown = {
      'name': 'math',
      'description': 'Basic mathematics.',
      'version': '0.1.0',
      'issued-at': '2026-01-01T00:00:00.000Z',
      'signature': null,
      'signed-by': null,
      'topics': {
        'addition': {
          'display-name': 'Addition',
          'description': 'Combining two values.',
        },
      },
    };
    const parse = () => TopicList.parse(candidate);

    // Act
    const actual = parse;

    // Assert
    assert.throws(actual, TypeError);
  });
});

describe('TopicList.serialize', () => {
  it('serializes a camelCase topic list', () => {
    // Description
    // Verifies names, dates, nested topics, and dependencies are encoded.

    // Arrange
    const input = {
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
      dependencies: {
        numbers: {
          topicListOwner: 'example.com',
          topicListName: 'numbers',
          topicListVersion: '0.1.0',
        },
        geometry: 'example.com/geometry@0.1.0',
      },
    } satisfies TopicList.TopicList;

    // Act
    const actual = TopicList.serialize(input) as Record<string, unknown>;

    // Assert
    assert.equal(actual['issued-at'], '2026-01-01T00:00:00.000Z');
    assert.equal(actual['signed-by'], null);
    assert.equal('issuedAt' in actual, false);
  });

  it('rejects an invalid Date during serialization', () => {
    // Description
    // Verifies invalid Date objects are surfaced instead of serialized.

    // Arrange
    const invalidDateTopicList = {
      owner: 'example.com',
      name: 'math',
      description: 'Basic mathematics.',
      version: '0.1.0',
      issuedAt: new Date('invalid'),
      signature: null,
      signedBy: null,
      topics: {
        addition: {
          displayName: 'Addition',
          description: 'Combining two values.',
        },
      },
    } satisfies TopicList.TopicList;
    const serialize = () => TopicList.serialize(invalidDateTopicList);

    // Act
    const actual = serialize;

    // Assert
    assert.throws(actual, RangeError);
  });
});

describe('TopicList.entries', () => {
  it('lists topics with their map keys', () => {
    // Description
    // Verifies topic IDs are derived without changing domain objects.

    // Arrange
    const topic = {
      displayName: 'Addition',
      description: 'Combining two values.',
    };
    const input = {
      owner: 'example.com',
      name: 'math',
      description: 'Basic mathematics.',
      version: '0.1.0',
      issuedAt: new Date('2026-01-01T00:00:00Z'),
      signature: null,
      signedBy: null,
      topics: {
        addition: topic,
      },
    } satisfies TopicList.TopicList;

    // Act
    const actual = TopicList.entries(input);

    // Assert
    assert.deepEqual(actual, [{ id: 'addition', topic }]);
    assert.equal('id' in topic, false);
  });
});

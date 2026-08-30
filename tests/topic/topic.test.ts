// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { Topic } from '../../src/index.js';
//

//
// TESTS
//

describe('Topic.parse', () => {
  it('parses a topic', () => {
    // Description
    // Verifies valid model data produces a topic.

    // Arrange
    const candidate: unknown = {
      'display-name': 'Addition',
      'description': 'Combining two values.',
    };

    // Act
    const actual = Topic.parse(candidate);

    // Assert
    assert.equal(actual.description, 'Combining two values.');
  });

  it('rejects an invalid topic', () => {
    // Description
    // Verifies unexpected topic fields fail model validation.

    // Arrange
    const candidate: unknown = {
      'display-name': 'Addition',
      'description': 'Combining two values.',
      'unexpected': true,
    };
    const parse = () => Topic.parse(candidate);

    // Act
    const actual = parse;

    // Assert
    assert.throws(actual, TypeError);
  });

  it('parses nested subtopics', () => {
    // Description
    // Verifies subtopic objects are recursively converted to camelCase.

    // Arrange
    const candidate: unknown = {
      'description': 'Combining two values.',
      'subtopics': [{ 'display-name': 'Carrying', 'description': 'Carry digits.' }],
    };

    // Act
    const actual = Topic.parse(candidate);

    // Assert
    assert.deepEqual(actual.subtopics, [
      { displayName: 'Carrying', description: 'Carry digits.' },
    ]);
  });
});

describe('Topic.serialize', () => {
  it('serializes a camelCase topic', () => {
    // Description
    // Verifies display name fields are renamed to kebab-case.

    // Arrange
    const input = {
      displayName: 'Addition',
      description: 'Combining two values.',
    } satisfies Topic.Topic;

    // Act
    const actual = Topic.serialize(input) as Record<string, unknown>;

    // Assert
    assert.equal(actual['display-name'], 'Addition');
    assert.equal('displayName' in actual, false);
  });
});

// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { TopicList } from '../../src/index.js';
//

//
// TESTS
//

describe('TopicList.formatDependency', () => {
  it('formats a topic-list dependency', () => {
    // Description
    // Verifies that dependency fields produce model shorthand.

    // Arrange
    const dependency = {
      topicListOwner: 'example.com',
      topicListName: 'math',
      topicListVersion: '0.1.0',
    };

    // Act
    const actual = TopicList.formatDependency(dependency);

    // Assert
    assert.equal(actual, 'example.com/math@0.1.0');
  });
});

describe('TopicList.formatDependencyTopic', () => {
  it('formats a dependency topic', () => {
    // Description
    // Verifies that dependency-topic fields return dot notation.

    // Arrange
    const dependencyTopic = {
      dependency: 'math',
      topic: 'addition',
    };

    // Act
    const actual = TopicList.formatDependencyTopic(dependencyTopic);

    // Assert
    assert.equal(actual, 'math.addition');
  });
});

describe('TopicList.parseDependency', () => {
  it('parses a topic-list dependency', () => {
    // Description
    // Verifies that schema-supported dependency shorthand is decomposed.

    // Arrange
    const dependency = 'example.com/math@0.1.0';

    // Act
    const actual = TopicList.parseDependency(dependency);

    // Assert
    assert.deepEqual(actual, {
      topicListOwner: 'example.com',
      topicListName: 'math',
      topicListVersion: '0.1.0',
    });
  });

  it('rejects an invalid topic-list version', () => {
    // Description
    // Verifies semantic versions are delegated to the semver package.

    // Arrange
    const dependency = 'example.com/math@version-one';

    // Act
    const actual = TopicList.parseDependency(dependency);

    // Assert
    assert.equal(actual, null);
  });
});

describe('TopicList.parseDependencyTopic', () => {
  it('parses a dependency topic with schema-supported segments', () => {
    // Description
    // Verifies the dependency is separated while the topic path is preserved.

    // Arrange
    const dependencyTopic = 'math.arithmetic.addition';

    // Act
    const actual = TopicList.parseDependencyTopic(dependencyTopic);

    // Assert
    assert.deepEqual(actual, {
      dependency: 'math',
      topic: 'arithmetic.addition',
    });
  });

  it('rejects an unqualified dependency topic', () => {
    // Description
    // Verifies dependency topics require a dependency segment.

    // Arrange
    const dependencyTopic = 'addition';

    // Act
    const actual = TopicList.parseDependencyTopic(dependencyTopic);

    // Assert
    assert.equal(actual, null);
  });
});

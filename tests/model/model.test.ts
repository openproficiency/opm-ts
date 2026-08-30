// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { Model, TopicList } from '../../src/index.js';
import * as DirectModel from '../../src/model/index.js';
import * as DirectTopicList from '../../src/topic-list/index.js';
//

//
// TESTS
//

describe('TopicList.serialize', () => {
  it('exposes topic lists through the root namespace', () => {
    // Description
    // Verifies the root namespace and direct area export share the same API.

    // Arrange
    const namespaced = TopicList.serialize;
    const direct = DirectTopicList.serialize;

    // Act
    const actual = namespaced === direct;

    // Assert
    assert.equal(actual, true);
  });
});

it('exposes model metadata through both entry points', () => {
  // Description
  // Verifies model metadata is independently importable.

  // Arrange
  const namespaced = Model.OPEN_PROFICIENCY_MODEL_VERSION;
  const direct = DirectModel.OPEN_PROFICIENCY_MODEL_VERSION;

  // Act
  const actual = namespaced === direct;

  // Assert
  assert.equal(actual, true);
});

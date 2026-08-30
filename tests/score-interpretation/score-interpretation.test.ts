// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { ScoreInterpretation } from '../../src/index.js';
//

//
// TESTS
//

describe('ScoreInterpretation.parse', () => {
  it('parses a score interpretation', () => {
    // Description
    // Verifies valid model data produces a score interpretation.

    // Arrange
    const candidate: unknown = {
      'name': 'Arithmetic',
      'description': 'Can perform arithmetic.',
      'requirements': {
        'math.addition': 'competent',
      },
    };

    // Act
    const actual = ScoreInterpretation.parse(candidate);

    // Assert
    assert.equal(actual.name, 'Arithmetic');
  });

  it('rejects an invalid score interpretation', () => {
    // Description
    // Verifies unqualified requirement keys fail model validation.

    // Arrange
    const candidate: unknown = {
      'name': 'Arithmetic',
      'description': 'Can perform arithmetic.',
      'requirements': { 'addition': 'competent' },
    };
    const parse = () => ScoreInterpretation.parse(candidate);

    // Act
    const actual = parse;

    // Assert
    assert.throws(actual, TypeError);
  });

  it('parses nested all/any requirement operators', () => {
    // Description
    // Verifies logical operator keys compose within a requirements expression.

    // Arrange
    const requirements = {
      'all-core': {
        'math.addition': 'competent',
        'any-elective': {
          'math.subtraction': 'competent',
          'math.multiplication': 'competent',
        },
      },
    };
    const candidate: unknown = {
      'name': 'Arithmetic',
      'description': 'Can perform arithmetic.',
      requirements,
    };

    // Act
    const actual = ScoreInterpretation.parse(candidate);

    // Assert
    assert.deepEqual(actual.requirements, requirements);
  });
});

describe('ScoreInterpretation.serialize', () => {
  it('serializes a score interpretation as its schema representation', () => {
    // Description
    // Verifies serialization returns the schema-compatible domain object unchanged.

    // Arrange
    const schemaScoreInterpretation = {
      'name': 'Arithmetic',
      'description': 'Can perform arithmetic.',
      'requirements': {
        'math.addition': 'competent',
      },
    };
    const input = ScoreInterpretation.parse(schemaScoreInterpretation);

    // Act
    const actual = ScoreInterpretation.serialize(input);

    // Assert
    assert.deepEqual(actual, schemaScoreInterpretation);
  });
});

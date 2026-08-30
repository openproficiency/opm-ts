// Built-in Imports
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Project Imports
import { ScoreInterpretationList } from '../../src/index.js';
//

//
// TESTS
//

describe('ScoreInterpretationList.parse', () => {
  it('parses a score interpretation list', () => {
    // Description
    // Verifies valid model data produces a score interpretation list.

    // Arrange
    const candidate: unknown = {
      'owner': 'example.com',
      'name': 'math-levels',
      'description': 'Mathematics proficiency levels.',
      'version': '0.1.0',
      'issued-at': '2026-01-01T00:00:00.000Z',
      'signature': null,
      'signed-by': null,
      'score-interpretations': {
        'arithmetic': {
          'name': 'Arithmetic',
          'description': 'Can perform arithmetic.',
          'requirements': {
            'math.addition': 'competent',
          },
        },
      },
    };

    // Act
    const actual = ScoreInterpretationList.parse(candidate);

    // Assert
    assert.ok(actual.issuedAt instanceof Date);
  });

  it('rejects an invalid score interpretation list', () => {
    // Description
    // Verifies unsupported dependency shapes fail model validation.

    // Arrange
    const candidate: unknown = {
      'owner': 'example.com',
      'name': 'math-levels',
      'description': 'Mathematics proficiency levels.',
      'version': '0.1.0',
      'issued-at': '2026-01-01T00:00:00.000Z',
      'signature': null,
      'signed-by': null,
      'score-interpretations': {
        'arithmetic': {
          'name': 'Arithmetic',
          'description': 'Can perform arithmetic.',
          'requirements': {
            'math.addition': 'competent',
          },
        },
      },
      'dependencies': { 'math': { 'name': 'math' } },
    };
    const parse = () => ScoreInterpretationList.parse(candidate);

    // Act
    const actual = parse;

    // Assert
    assert.throws(actual, TypeError);
  });

  it('parses multiple interpretations with nested all/any/at-least-N requirements', () => {
    // Description
    // Verifies the schema accepts several interpretations composed from
    // nested logical operators, including the at-least-N operator form.

    // Arrange
    const mastery = {
      name: 'Mastery',
      description: 'Broad mastery across arithmetic operations.',
      requirements: {
        'all-core': {
          'math.addition': 'fluent',
          'any-elective': {
            'math.subtraction': 'competent',
            'math.multiplication': 'competent',
          },
          'at-least-2-breadth': {
            'math.addition': 'fluent',
            'math.subtraction': 'fluent',
            'math.multiplication': 'fluent',
          },
        },
      },
    } satisfies ScoreInterpretationList.ScoreInterpretationList['scoreInterpretations'][string];
    const scoreInterpretationList = {
      owner: 'example.com',
      name: 'math-levels',
      description: 'Mathematics proficiency levels.',
      version: '0.1.0',
      issuedAt: new Date('2026-01-01T00:00:00Z'),
      signature: null,
      signedBy: null,
      scoreInterpretations: {
        arithmetic: {
          name: 'Arithmetic',
          description: 'Can perform arithmetic.',
          requirements: {
            'math.addition': 'competent',
          },
        },
        mastery,
      },
    } satisfies ScoreInterpretationList.ScoreInterpretationList;
    const candidate = ScoreInterpretationList.serialize(
      scoreInterpretationList,
    );

    // Act
    const actual = ScoreInterpretationList.parse(candidate);

    // Assert
    assert.deepEqual(
      Object.keys(actual.scoreInterpretations),
      ['arithmetic', 'mastery'],
    );
    assert.deepEqual(
      actual.scoreInterpretations.mastery.requirements,
      mastery.requirements,
    );
  });
});

describe('ScoreInterpretationList.entries', () => {
  it('lists score interpretations with their map keys', () => {
    // Description
    // Verifies interpretation IDs are derived without changing domain objects.

    // Arrange
    const scoreInterpretation = {
      name: 'Arithmetic',
      description: 'Can perform arithmetic.',
      requirements: {
        'math.addition': 'competent',
      },
    } satisfies ScoreInterpretationList.ScoreInterpretationList['scoreInterpretations'][string];
    const input = {
      owner: 'example.com',
      name: 'math-levels',
      description: 'Mathematics proficiency levels.',
      version: '0.1.0',
      issuedAt: new Date('2026-01-01T00:00:00Z'),
      signature: null,
      signedBy: null,
      scoreInterpretations: {
        arithmetic: scoreInterpretation,
      },
    } satisfies ScoreInterpretationList.ScoreInterpretationList;

    // Act
    const actual = ScoreInterpretationList.entries(input);

    // Assert
    assert.deepEqual(actual, [
      { id: 'arithmetic', interpretation: scoreInterpretation },
    ]);
    assert.equal('id' in scoreInterpretation, false);
  });
});

// Installed Imports
import Ajv2020, {
  type AnySchemaObject,
  type ValidateFunction,
} from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { valid as validSemver } from 'semver';

//
// CONSTANTS
//

const schemaBase =
  'https://raw.githubusercontent.com/openproficiency/model/refs/heads/main/schemas/';
const registry = new Ajv2020({ allErrors: true });
addFormats(registry);
registry.addFormat('kebab-case', /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
registry.addFormat('semver', (value: string) => validSemver(value) === value);

const registeredSchemas = new Set<string>();

//
// PUBLIC TYPES
//

export type SchemaRegistration = readonly [string, AnySchemaObject];

//
// PUBLIC FUNCTIONS
//

/** Parses validated schema data into its public domain representation. */
export function parseSchema<Schema, Domain>(
  label: string,
  value: unknown,
  validate: ValidateFunction<Schema>,
  convert: (schema: Schema) => Domain,
): Domain {
  // Reject values that do not conform to the model schema.
  if (!validate(value)) {
    throw new TypeError(`${label}: ${registry.errorsText(validate.errors)}`);
  }

  // Convert validated schema data to the public domain type.
  return convert(value);
}

/** Builds and registers a validator for a schema and its dependencies. */
export function schemaValidator<T>(
  registration: SchemaRegistration,
  dependencies: readonly SchemaRegistration[] = [],
): ValidateFunction<T> {
  // Register dependency schemas first so the main schema can reference them.
  for (const dependency of dependencies) registerSchema(dependency);
  registerSchema(registration);

  // Look up the compiled validator by its registered URL.
  const [name] = registration;
  const validate = registry.getSchema<T>(schemaUrl(name));

  if (!validate) throw new Error(`Missing validator for ${name}`);

  return validate;
}

//
// PRIVATE FUNCTIONS
//

/** Registers a schema with Ajv once, skipping duplicate registrations. */
function registerSchema([name, schema]: SchemaRegistration): void {
  // Skip schemas already available in the registry.
  if (registeredSchemas.has(name)) return;

  // Register the schema under its published URL.
  registry.addSchema({ ...schema, $id: schemaUrl(name) });

  // Remember that the schema is available.
  registeredSchemas.add(name);
}

/** Builds the published URL used to identify a model schema. */
function schemaUrl(name: string): string {
  // Append the schema name to the model schema base URL.
  return `${schemaBase}${name}.schema.json`;
}

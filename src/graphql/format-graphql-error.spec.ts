import type { GraphQLFormattedError } from 'graphql';
import { formatGraphQLError } from './format-graphql-error.js';

describe('formatGraphQLError', () => {
  const build = (originalError: unknown, extra = {}): GraphQLFormattedError => ({
    message: 'x',
    extensions: { code: 'INTERNAL_SERVER_ERROR', originalError, ...extra },
  });

  it('maps 404 to NOT_FOUND', () => {
    const result = formatGraphQLError(
      build({ message: 'Todo 1 not found', error: 'Not Found', statusCode: 404 }),
    );

    expect(result.message).toBe('Todo 1 not found');
    expect(result.extensions).toEqual({ code: 'NOT_FOUND', status: 404 });
  });

  it('exposes validation messages', () => {
    const result = formatGraphQLError(
      build({ message: ['title should not be empty'], statusCode: 400 }),
    );

    expect(result.message).toBe('title should not be empty');
    expect(result.extensions).toEqual({
      code: 'BAD_REQUEST',
      status: 400,
      validationErrors: ['title should not be empty'],
    });
  });

  it('keeps the stacktrace only when present', () => {
    const result = formatGraphQLError(
      build({ message: 'm', statusCode: 404 }, { stacktrace: ['a'] }),
    );

    expect(result.extensions?.stacktrace).toEqual(['a']);
  });

  it('leaves non-HTTP errors untouched', () => {
    const error = build(undefined);

    expect(formatGraphQLError(error)).toBe(error);
  });
});

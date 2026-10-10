import type { GraphQLFormattedError } from 'graphql';

interface HttpErrorBody {
  statusCode: number;
  message: string | string[];
}

const CODES: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHENTICATED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
};

// Nest wraps HttpExceptions as INTERNAL_SERVER_ERROR; restore a code that matches the HTTP status.
export function formatGraphQLError(formatted: GraphQLFormattedError): GraphQLFormattedError {
  const { originalError, stacktrace, ...extensions } = formatted.extensions ?? {};
  const body = originalError as HttpErrorBody | undefined;
  if (typeof body?.statusCode !== 'number') {
    return formatted;
  }

  const messages = Array.isArray(body.message) ? body.message : [body.message];
  return {
    ...formatted,
    message: messages.join('; '),
    extensions: {
      ...extensions,
      code: CODES[body.statusCode] ?? extensions.code,
      status: body.statusCode,
      ...(Array.isArray(body.message) && { validationErrors: body.message }),
      ...(stacktrace !== undefined && { stacktrace }),
    },
  };
}

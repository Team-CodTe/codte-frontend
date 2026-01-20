export const VALIDATION_STATUS = {
  IDLE: 'idle',
  VALIDATING: 'validating',
  VALID: 'valid',
  INVALID: 'invalid',
} as const;

export type ValidationStatus =
  (typeof VALIDATION_STATUS)[keyof typeof VALIDATION_STATUS];

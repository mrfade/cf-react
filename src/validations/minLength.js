export const minLength = {
  errorMessage: 'Value must be at least {0} characters',
  handler: (value, minLength) => {
    if (typeof value !== 'string') {
      return false;
    }

    return value.length >= minLength;
  }
}  

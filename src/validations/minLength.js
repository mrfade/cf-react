export const minLength = {
  errorMessage: 'Value must be at least {minLength} characters',
  handler: (value, minLength) => {
    if (typeof value !== 'string') {
      return false;
    }

    return value.length >= minLength;
  }
}  

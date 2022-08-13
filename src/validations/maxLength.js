export const maxLength = {
  errorMessage: 'Value must be at most {0} characters',
  handler: (value, maxLength) => {
    if (typeof value !== 'string') {
      return false;
    }

    return value.length <= maxLength;
  }
}  

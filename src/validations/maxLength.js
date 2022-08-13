export const maxLength = {
  errorMessage: 'Value must be at most {maxLength} characters',
  handler: (value, maxLength) => {
    if (typeof value !== 'string') {
      return false;
    }

    return value.length <= maxLength;
  }
}  

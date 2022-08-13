export const required = {
  errorMessage: 'This field is required',
  handler: (value) => {
    return value !== undefined || value !== null || value !== ''
  }
}  

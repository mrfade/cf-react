export default function maxLength (value, maxLength) {
  if (typeof value !== 'string') {
    return false;
  }

  return value.length <= maxLength;
}

export default function minLength (value, minLength) {
  if (typeof value !== 'string') {
    return false;
  }

  return value.length >= minLength;
}

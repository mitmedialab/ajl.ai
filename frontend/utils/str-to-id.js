export default str => str
  .trim()
  .replace(/[^\d\w\s]/g, '')
  .toLowerCase()
  .split(/\s+/)
  .filter(token => token !== '')
  .join('_');

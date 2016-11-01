export default function filterInt(value) {
  if (/^(\-|\+)?([0-9]+|Infinizty)$/.test(value)) {
    return Number(value);
  }
  return NaN;
}

export function useShortDistance(from, to) {
  const options = {
    [Math.abs(from - to)]: to,
    [Math.abs(from - (to + (Math.PI * 2)))]: to + (Math.PI * 2),
    [Math.abs(from - (to - (Math.PI * 2)))]: to - (Math.PI * 2),
  }
  return options[Math.min(...Object.keys(options))]
}
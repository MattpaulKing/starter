export default function(str: string) {
  str = str.replace(/[A-Z]/g, letter => ` ${letter}`)
  return str[0]?.toUpperCase().concat(str.slice(1))
}

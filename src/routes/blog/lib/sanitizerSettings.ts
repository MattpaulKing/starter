export const sanitizerSettings = {
  allowedTags: ['b', 'p', 'ul', 'li', 'a'],
  allowedAttributes: {
    a: ['href']
  },
  allowedClasses: {
    '*': ['font-bold'],
    p: ['my-0'],
    a: ['anchor'],
    h1: ['text-token'],
    h2: ['text-token'],
    h3: ['text-token'],
    ul: ['list-disc', 'list-outside']
  }
}

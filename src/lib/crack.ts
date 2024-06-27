import * as crypto from 'crypto'
import passwords from './passwords'

const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789'

function generateMd5Hash(s: string): string {
  return crypto.createHash('md5').update(s).digest('hex')
}

async function* generateCombinations(
  length: number,
  prefix: string = '',
): AsyncGenerator<string> {
  if (length === 0) {
    yield prefix
  } else {
    for (const char of CHARSET) {
      yield* generateCombinations(length - 1, prefix + char)
    }
  }
}

export async function crackMd5Hash(md5Hash: string): Promise<string | null> {
  if (passwords[md5Hash]) {
    return passwords[md5Hash]
  }

  const maxLength = 16
  for (let length = 1; length <= maxLength; length++) {
    const generator = generateCombinations(length)
    for await (const combination of generator) {
      if (generateMd5Hash(combination) === md5Hash) {
        return combination
      }
    }
  }

  return null
}

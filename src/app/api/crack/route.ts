import { crackMd5Hash } from '@/lib/crack'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.get('md5')

  if (!params) {
    return NextResponse.json(
      {
        error: 'No md5 parameter provided',
      },
      {
        status: 400,
      },
    )
  }

  if (params.length !== 32) {
    return NextResponse.json(
      {
        error: 'Invalid md5 hash',
      },
      {
        status: 400,
      },
    )
  }

  const md5Hash = params

  const result = await crackMd5Hash(md5Hash)

  if (!result) {
    return NextResponse.error()
  }

  const json = {
    result,
  }
  console.log(json)

  return NextResponse.json(json)
}

'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useState, useEffect } from 'react'
import { set, z } from 'zod'

const md5Schema = z.object({
  md5: z.coerce
    .string()
    .min(1, 'Required')
    .regex(/^[a-f0-9]{32}$/, 'Invalid MD5 hash'),
})

type FormData = z.infer<typeof md5Schema>

export default function Home() {
  const [md5, setMd5] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      const data = { md5 }
      md5Schema.parse(data)

      const response = await fetch(
        `/api/crack?md5=${encodeURIComponent(md5)}`,
        { signal: AbortSignal.timeout(45000) },
      )
      if (response.ok) {
        const responseData = await response.json()
        setResult(responseData.result)
        setError(null)
      } else {
        setResult('Unable to fetch result')
      }
    } catch (error) {
      setResult(null)
      setError('Invalid MD5 hash')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-black text-white flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="container max-w-md px-4 py-12 space-y-6">
        <h1 className="text-4xl font-bold text-center text-primary">
          ⛏️ Decrypt MD5 Hashes
        </h1>
        <form
          onSubmit={onSubmit}
          className="flex items-center w-full max-w-md space-x-2"
        >
          <Input
            variant="primary"
            type="text"
            placeholder="Enter a md5 to Uncrack"
            value={md5}
            onChange={(e) => setMd5(e.target.value)}
            disabled={loading}
            onFocus={() => {
              setError(null)
              setResult(null)
            }}
          />
          <Button
            variant="primary"
            type="submit"
            className="px-6 py-2 text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Decrypting' : 'Decrypt'}
          </Button>
        </form>
        {error && <div className="mt-2 text-red-600">{error}</div>}
        {result && (
          <div className="p-4 bg-card rounded-md shadow-md">
            <p className="text-lg font-medium text-card-foreground">
              Result:
              <span className="ml-2 text-primary font-bold">{result}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

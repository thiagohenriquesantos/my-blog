// Example: src/pages/og/[...slug].png.ts
import { ImageResponse } from '@vercel/og'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params

  // Fetch post data (you'd implement this based on your content structure)
  const postTitle = "Your Dynamic Post Title"
  const postDescription = "Your post description here"

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1f2937',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div style={{ marginBottom: 20, color: '#f9fafb' }}>
          Thiago Colman
        </div>
        <div style={{
          color: '#60a5fa',
          textAlign: 'center',
          maxWidth: 800,
          lineHeight: 1.2
        }}>
          {postTitle}
        </div>
        {postDescription && (
          <div style={{
            color: '#9ca3af',
            fontSize: 24,
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: 600,
            marginTop: 20,
            lineHeight: 1.3
          }}>
            {postDescription}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
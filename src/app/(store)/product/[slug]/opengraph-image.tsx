import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import Image from 'next/image'
import { ImageResponse } from 'next/og'
import colors from "tailwindcss/colors"
 
// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

async function getProduct(slug: string): Promise<Product> {
    const response = await api(`/products/${slug}`, {
        next: {
            revalidate: 60 * 60
        }
    })

    const product = response.json()

    return product
}
 
export const contentType = 'image/png'
 
export default async function OgImage({ params }: { params: { slug: string }}) {

    const product = await getProduct(params.slug)

    const productImageUrl = new URL(product.image, env.APP_URL).toString()
 
  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <img 
            src={productImageUrl}
            alt=''
            style={{ width: "100%"}}
        /> 
      </div>
    ),
    
    {
      ...size,
    }
  )
}
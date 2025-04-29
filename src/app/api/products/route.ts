import data from "@/app/api/products/data.json"

export async function GET() {
    return Response.json(data.products)
}
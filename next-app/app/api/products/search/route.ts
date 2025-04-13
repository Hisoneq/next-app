import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('query') || '';

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query, //includes 
                mode: 'insensitive' //to lower case 
            }
        },

        take: 5, //return only 5 items
    })

    return NextResponse.json(products);
}
"use server"

import prismaDb from "@/lib/prismaDB"
import { CreateCategoryProps } from "@/types/types"


export const createCategory = async ({ categoryName }: CreateCategoryProps) => {
    try {
        const newCategory = await prismaDb.category.create({
            data: {
                name: categoryName
            }
        })
        return JSON.parse(JSON.stringify(newCategory))
    } catch (error) {
        console.log(error)
    }
}
export const getAllCategories = async () => {
    try {
        const categories = await prismaDb.category.findMany({

        })
        return JSON.parse(JSON.stringify(categories))
    } catch (error) {
        console.log(error)
    }
}

export const getCategoryByName = async (name: string) => {
    return prismaDb.category.findFirst({
        where: {
            name
        }
    })
}
export const getCategoryById = async (categoryId: string) => {
    return prismaDb.category.findUnique({
        where: {
            id:categoryId
        }
    })
}
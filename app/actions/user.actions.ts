"use server"


import prismaDb from "@/lib/prismaDB"
import { CreateUserProps, UpdateUserProps } from "@/types/types"



export const createUser = async (user: CreateUserProps) => {
    try {

        const { clerkId, first_name, last_name, username, email, image_url } = user
        const newUser = await prismaDb.user.create({
            data: {
                clerkId, first_name, last_name, username, email, image_url
            }
        })

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }

}

export const getUserById = async (userId: string) => {
    try {

        const user = await prismaDb.user.findUnique({
            where: {
                id: userId
            },
            include:{
                order:{
                    select:{
                        eventId:true
                    }
                }
            }
        })
        if (!user) throw new Error("User not found")
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (id: string, user: UpdateUserProps) => {
    try {
        const { first_name, last_name, username, image_url } = user
        const updatedUser = await prismaDb.user.update({
            where: {
                clerkId: id
            },
            data: {
                first_name, last_name, username, image_url
            }
        })
        if (!updatedUser) throw new Error("User update failed")
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (id: string) => {
    try {
        const userToDelete = await prismaDb.user.delete({
            where: {
                clerkId: id
            }
        })
        if (!userToDelete) throw new Error("User not found")

    } catch (error) {
        console.log(error)
    }
}
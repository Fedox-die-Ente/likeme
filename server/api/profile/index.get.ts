import {prisma} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    if (!session || !session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            githubId: session.user.githubId
        },
        include: {
            likesReceived: {
                include: {
                    fromUser: {
                        select: {
                            id: true,
                            name: true,
                            avatarUrl: true,
                            githubId: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            _count: {
                select: {
                    likesReceived: true
                }
            }
        }
    }) as any

    if (!user) {
        throw createError({
            statusCode: 404,
            message: 'User not found'
        })
    }

    return {
        id: user.id,
        githubId: user.githubId,
        name: user.name,
        avatarUrl: user.avatarUrl,
        bio: user.bio || null,
        createdAt: user.createdAt,
        likesCount: user._count.likesReceived,
        likesReceived: (user.likesReceived || []).map((like: any) => ({
            id: like.id,
            createdAt: like.createdAt,
            fromUser: like.fromUser
        }))
    }
})


import {prisma} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, 'username')

    const user = await prisma.user.findUnique({
        where: {
            name: name
        },
        include: {
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

    const getAccountAge = () => {
        if (!user.createdAt) return 'N/A'
        const created = new Date(user.createdAt)
        const now = new Date()
        const years = now.getFullYear() - created.getFullYear()

        if (years > 0) {
            return `${years}Y`
        }
        const months = now.getMonth() - created.getMonth()
        if (months > 0) {
            return `${months}MO`
        }
        return 'NEW'
    }

    const formatCount = (count: number) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`
        }
        return count.toString()
    }

    const likesCount = user._count?.likesReceived || 0
    const bio = user.bio || 'No bio yet'
    const accountAge = getAccountAge()

    const displayBio = bio.length > 35 ? bio.substring(0, 32) + '...' : bio

    setHeader(event, 'Content-Type', 'image/svg+xml')
    setHeader(event, 'Cache-Control', 'public, max-age=300')

    return `<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <filter id="sketch">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/>
        </filter>

        <pattern id="dashes" patternUnits="userSpaceOnUse" width="8" height="8">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
        </pattern>
    </defs>

    <rect x="6" y="6" width="394" height="114" fill="rgba(42, 42, 42, 0.08)" rx="4"/>

    <rect x="2" y="2" width="394" height="114" fill="white" stroke="#2a2a2a" stroke-width="2" rx="4"/>

    <rect x="4" y="4" width="390" height="110" fill="none" stroke="#2a2a2a" stroke-width="0.5" stroke-dasharray="4,4"
          opacity="0.3" rx="3"/>

    <circle cx="50" cy="60" r="28" fill="#f0f0f0" stroke="#2a2a2a" stroke-width="2"/>
    <text x="50" y="68" font-family="Arial, sans-serif" font-size="28" fill="#2a2a2a" text-anchor="middle">👨‍💻</text>

    <circle cx="64" cy="46" r="10" fill="white" stroke="#2a2a2a" stroke-width="1.5"/>
    <text x="64" y="51" font-family="Arial, sans-serif" font-size="11" fill="#e74c3c" text-anchor="middle">♥</text>

    <line x1="95" y1="20" x2="95" y2="100" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3,3"/>

    <text x="110" y="35" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#2a2a2a">
        @${user.name}
    </text>
    <text x="110" y="52" font-family="'Courier New', monospace" font-size="10" fill="#666">${displayBio}
    </text>

    <line x1="110" y1="64" x2="385" y2="64" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3,3"/>

    <g id="stats">
        <text x="145" y="85" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#2a2a2a">
            ${formatCount(likesCount)}
        </text>
        <text x="145" y="98" font-family="'Courier New', monospace" font-size="8" fill="#888" letter-spacing="0.5">
            LIKES
        </text>
        <rect x="140" y="102" width="20" height="2" fill="#2a2a2a"/>

        <text x="235" y="85" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#2a2a2a">
            ${user.githubId}
        </text>
        <text x="235" y="98" font-family="'Courier New', monospace" font-size="8" fill="#888" letter-spacing="0.5">
            GITHUB ID
        </text>
        <rect x="230" y="102" width="20" height="2" fill="#2a2a2a"/>

        <text x="330" y="85" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#2a2a2a">
            ${accountAge}
        </text>
        <text x="330" y="98" font-family="'Courier New', monospace" font-size="8" fill="#888" letter-spacing="0.5">
            ACTIVE
        </text>
        <rect x="325" y="102" width="20" height="2" fill="#2a2a2a"/>
    </g>

    <rect x="310" y="12" width="78" height="18" fill="#fafafa" stroke="#ccc" stroke-width="1" stroke-dasharray="2,2"
          rx="2"/>
    <text x="349" y="23" font-family="'Courier New', monospace" font-size="9" fill="#999" text-anchor="middle">VIEW
        PROFILE
    </text>

    <line x1="8" y1="8" x2="15" y2="8" stroke="#2a2a2a" stroke-width="1.5"/>
    <line x1="8" y1="8" x2="8" y2="15" stroke="#2a2a2a" stroke-width="1.5"/>

    <line x1="388" y1="8" x2="381" y2="8" stroke="#2a2a2a" stroke-width="1.5"/>
    <line x1="388" y1="8" x2="388" y2="15" stroke="#2a2a2a" stroke-width="1.5"/>

    <line x1="8" y1="110" x2="15" y2="110" stroke="#2a2a2a" stroke-width="1.5"/>
    <line x1="8" y1="110" x2="8" y2="103" stroke="#2a2a2a" stroke-width="1.5"/>

    <line x1="388" y1="110" x2="381" y2="110" stroke="#2a2a2a" stroke-width="1.5"/>
    <line x1="388" y1="110" x2="388" y2="103" stroke="#2a2a2a" stroke-width="1.5"/>
</svg>
`
})

import { db } from "@/lib/db";
import { redirect } from "next/navigation"
import { initalProfile } from "@/lib/inital-profile"

const SetupPage = async () => {
    const profile = await initalProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }
    return <div>Create a server</div>
}

export default SetupPage
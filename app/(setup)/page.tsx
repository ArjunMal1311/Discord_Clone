import { db } from "@/lib/db";
import { redirect } from "next/navigation"
import { initalProfile } from "@/lib/inital-profile"
import { InitialModal } from "@/components/modals/intial-model";

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
    return <div><InitialModal /></div>
}

export default SetupPage
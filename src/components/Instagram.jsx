import { Outlet } from "react-router-dom";
import Profile from "./Profile";

export default function Instagram(){
    return(
        <main className="instagram">
            <Profile />
            <Outlet />
        </main>
    )
}
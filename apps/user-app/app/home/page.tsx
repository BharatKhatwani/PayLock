// import { Redirect } from "next"
import { redirect } from "next/navigation";

export default function Page(){

    return <div>
        <button onClick={redirect("/auth")}>Auth PAGE</button>

    </div>
}
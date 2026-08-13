import {redirect} from "next/navigation";

export default function redirect_to_dashboard() {
        return redirect("/admin/dashboard");
}
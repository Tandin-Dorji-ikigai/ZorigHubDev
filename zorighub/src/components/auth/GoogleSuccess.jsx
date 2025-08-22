import { useEffect } from "react";
import axios from "axios";

export default function GoogleSuccess() {
    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/user", { withCredentials: true })
            .then(res => {
                // store token/user and navigate to app
                localStorage.setItem("token", res.data.token);
                // navigate("/dashboard") ...
            })
            .catch(() => {/* show error */ });
    }, []);

    return <div className="p-6">Signing you in…</div>;
}
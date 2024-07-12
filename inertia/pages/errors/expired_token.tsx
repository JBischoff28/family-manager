import { Head, Link } from "@inertiajs/react";

export default function ExpiredToken() {
    return (
        <div>
            <Head title="Expired Token" />
            <h1>This token has expired</h1>
            <p>Please request a new reset token through the forgot password flow.</p>
            <Link href="/forgot-password">Back to forgot password</Link>
        </div>
    )
}
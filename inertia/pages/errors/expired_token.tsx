import { Head, Link } from "@inertiajs/react";

export default function ExpiredToken() {
    return (
        <>
            <Head title="Expired Token" />
            <div>
                <h1>This token has expired</h1>
                <p>Please request a new reset token through the forgot password flow.</p>
                <Link href="/forgot-password">Back to forgot password</Link>
            </div>
        </>
    )
}
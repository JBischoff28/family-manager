import { Head } from "@inertiajs/react";

export default function TokenNotFound() {
    return (
        <>
            <Head title="Token Not Found" />
            <div>
                <h1>Password Reset Token Not Found</h1>
                <p>Please try clicking the link sent to your email again. If this error continues to persist, feel free to contact customer support.</p>
            </div>
        </>
    )
}
import { Head } from "@inertiajs/react"

export default function VerifyEmail() {
    return (
        <>
            <Head title='Verify Your Email' />
            <div>
                <h1>Thank you for creating your account with Family Manager!</h1>
                <p>An verification link has been sent to the email that you provided. Please see that email to finish your account registration.</p>
            </div>
        </>
    )
}
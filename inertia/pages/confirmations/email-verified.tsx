import { Head } from "@inertiajs/react"
import LinkButton from "~/components/LinkButton"

export default function EmailVerified() {
    return (
        <>
            <Head title='Email Verified' />
            <div>
                <h1>You're email is now verified!</h1>
                <p>Next, let's create your household.</p>
                <LinkButton link="/household/create" buttonText="Let's Get Started!" />
            </div>
        </>
    )
}
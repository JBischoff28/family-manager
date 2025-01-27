import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Login(props: { errors: any }) {
    const [form, setForm] = useState({
        email: ''
    })

    const [missingFields, setMissingFields] = useState({
        email: ''
    })

    const [errors, setErrors] = useState<any[]>([])

    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value
        setForm(values => ({
            ...values,
            [key]: value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (form.email) {
            setSubmitting(true)
            router.post('/forgot-password', form)
        }
        const newMissingFields = {
            email: ''
        }
        if (form.email.trim() == '') {
            newMissingFields.email = "Please enter your email address"
        }
        setMissingFields(newMissingFields)
    }

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors)
        }
    }, [props.errors])

    return (
        <>
            <Head title='Forgot Password' />
            <div>
                <h1>Password Reset</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={form.email} onChange={handleChange} />
                            {missingFields.email != '' && <span>{missingFields.email}</span>}
                            {errors[0] && errors[0].field == 'email' ? <span>{errors[0].message}</span> : ""}
                            {errors[0] && errors[0].field != 'email' ? <span>{errors[0].message}</span> : ""}
                        </div>
                    </div>
                    <button disabled={submitting} type="submit">Send Reset Token</button>
                </form>
            </div>
        </>
    )
}
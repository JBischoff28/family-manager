import { Head, router } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function ResetPassword(props: { token: string, errors: any }) {

    const [form, setForm] = useState({
        password: '',
        passwordConfirmation: '',
        token: props.token
    })

    const [missingFields, setMissingFields] = useState({
        password: '',
        passwordConfirmation: '',
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
        if (form.password && form.passwordConfirmation) {
            setSubmitting(true)
            router.post('/reset-password', form)
        }
        const newMissingFields = {
            password: '',
            passwordConfirmation: ''
        }
        if (form.password.trim() == '') {
            newMissingFields.password = "Please enter a new password"
        }
        if (form.passwordConfirmation.trim() == '') {
            newMissingFields.passwordConfirmation = "Please confirm your password"
        }
        setMissingFields(newMissingFields)
    }

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors)
        }
    }, [props.errors])

    return (
        <div>
            <Head title="Password Reset" />
            <p>Reset Your Password</p>
            <form>
                <input type='hidden' value={form.token} name='token' />
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={form.password} onChange={handleChange} />
                    {missingFields.password != '' && <span>{missingFields.password}</span>}
                    {errors[0] && errors[0].field == 'password' && errors[0].rule != 'confirm' ? <span>{errors[0].message}</span> : ""}
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                    <input type="password" id="passwordConfirmation" value={form.passwordConfirmation} onChange={handleChange} />
                    {missingFields.passwordConfirmation != '' && <span>{missingFields.passwordConfirmation}</span>}
                    {errors[0] && errors[0].field == 'password' && errors[0].rule == 'confirm' ? <span>{errors[0].message}</span> : ""}
                </div>
                <button disabled={submitting} onClick={(e) => handleSubmit(e)}>Reset</button>
            </form>
        </div>
    )
}
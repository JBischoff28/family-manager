import { useState, useEffect } from 'react'
import { Head, router } from '@inertiajs/react'

export default function Register(props: { errors: any[], step: number }) {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const [missingFields, setMissingFields] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const [step, setStep] = useState(1)

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
    if (form.firstName && form.lastName && form.dateOfBirth && form.email && form.username && form.password && form.passwordConfirmation) {
      setSubmitting(true)
      router.post('/register', form)
    }
    const newMissingFields = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
    if (form.firstName.trim() == '') {
      newMissingFields.firstName = "Please enter your first name"
    }
    if (form.lastName.trim() == '') {
      newMissingFields.lastName = "Please enter your last name"
    }
    if (form.dateOfBirth.trim() == '') {
      newMissingFields.dateOfBirth = "Please enter your date of birth"
    }
    if (form.email.trim() == '') {
      newMissingFields.email = "Please enter your email address"
    }
    if (form.username.trim() == '') {
      newMissingFields.username = "Please enter a username"
    }
    if (form.password.trim() == '') {
      newMissingFields.password = "Please enter a new password"
    }
    if (form.passwordConfirmation.trim() == '') {
      newMissingFields.passwordConfirmation = "Please confirm your password"
    }
    setMissingFields(newMissingFields)
  }

  const handleNextStep = (e: any) => {
    e.preventDefault()
    if (form.firstName && form.lastName && form.dateOfBirth && step == 1) {
      setStep(2)
    } else if (form.email && form.username && step == 2) {
      setStep(3)
    }
    const newMissingFields = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
    if (form.firstName.trim() == '' && step == 1) {
      newMissingFields.firstName = "Please enter your first name"
    }
    if (form.lastName.trim() == '' && step == 1) {
      newMissingFields.lastName = "Please enter your last name"
    }
    if (form.email.trim() == '' && step == 2) {
      newMissingFields.email = "Please enter your email address"
    }
    if (form.username.trim() == '' && step == 2) {
      newMissingFields.username = "Please enter a username"
    }
    if (form.dateOfBirth.trim() == '' && step == 1) {
      newMissingFields.dateOfBirth = "Please enter your date of birth"
    }
    setMissingFields(newMissingFields)
  }

  const handlePrevStep = (e: any) => {
    e.preventDefault()
    setStep(step - 1)
  }

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors)
    }
    if (props.step == 1) {
      setStep(1)
    }
  }, [props.errors])

  return (
    <div>
      <Head title='Register' />
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {step == 1 &&
          <div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" value={form.firstName} onChange={handleChange} />
              {missingFields.firstName != '' && <span>{missingFields.firstName}</span>}
              {errors[0] && errors[0].field == 'firstName' ? <span>{errors[0].message}</span> : ""}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" value={form.lastName} onChange={handleChange} />
              {missingFields.lastName != '' && <span>{missingFields.lastName}</span>}
              {errors[0] && errors[0].field == 'lastName' ? <span>{errors[0].message}</span> : ""}
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input type="date" id="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
              {missingFields.dateOfBirth != '' && <span>{missingFields.dateOfBirth}</span>}
              {errors[0] && errors[0].field == 'dateOfBirth' ? <span>{errors[0].message}</span> : ""}
            </div>
            <div>
              <button onClick={(e) => handleNextStep(e)}>Next</button>
            </div>
          </div>}
        {step == 2 &&
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={form.email} onChange={handleChange} />
              {missingFields.email != '' && <span>{missingFields.email}</span>}
              {errors[0] && errors[0].field == 'email' ? <span>{errors[0].message}</span> : ""}
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input type="username" id="username" value={form.username} onChange={handleChange} />
              {missingFields.username != '' && <span>{missingFields.username}</span>}
              {errors[0] && errors[0].field == 'username' ? <span>{errors[0].message}</span> : ""}
            </div>
            <div>
              <button onClick={(e) => handlePrevStep(e)}>Back</button>
              <button onClick={(e) => handleNextStep(e)}>Next</button>
            </div>
          </div>}
        {step == 3 &&
          <div>
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
            <div>
              <button onClick={(e) => handlePrevStep(e)}>Back</button>
              <button disabled={submitting && !errors} type="submit">Register</button>
            </div>
          </div>}
      </form>
    </div>
  )
}
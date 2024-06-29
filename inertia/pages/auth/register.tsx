import { useState, useEffect } from 'react'
import { Head, router } from '@inertiajs/react'

export default function Register(props: { errors: any[], step: number }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  })
  
  const [missingFields, setMissingFields] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const [step, setStep] = useState(1)

  const [errors, setErrors] = useState<any[]>([])

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
    if (form.name && form.email && form.username && form.password && form.passwordConfirmation) {
      router.post('/register', form)
    }
    const newMissingFields = {
      name: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
    if (form.name.trim() == '') {
      newMissingFields.name = "Please enter your full name"
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
    if (form.name && form.email && form.username) {
      setStep(2)
    }
    const newMissingFields = {
      name: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
    if (form.name.trim() == '') {
      newMissingFields.name = "Please enter your full name"
    }
    if (form.email.trim() == '') {
      newMissingFields.email = "Please enter your email address"
    }
    if (form.username.trim() == '') {
      newMissingFields.username = "Please enter a username"
    }
    setMissingFields(newMissingFields)
  }

  const handlePrevStep = (e: any) => {
    e.preventDefault()
    setStep(1)
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
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={form.name} onChange={handleChange} />
            {missingFields.name != '' && <span>{missingFields.name}</span>}
            {errors[0] && errors[0].field == 'name' ? <span>{errors[0].message}</span> : ""}
          </div>
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
            <button onClick={(e) => handleNextStep(e)}>Next</button>
          </div>
        </div>}
        {step == 2 &&
        <div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={form.password} onChange={handleChange} />
            {missingFields.password != '' && <span>{missingFields.password}</span>}
            {errors[0] && errors[0].field == 'password' && errors[0].rule != 'confirm' ? <span>{errors[0].message}</span>: ""}
          </div>
          <div>
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input type="password" id="passwordConfirmation" value={form.passwordConfirmation} onChange={handleChange} />
            {missingFields.passwordConfirmation != '' && <span>{missingFields.passwordConfirmation}</span>}
            {errors[0] && errors[0].field == 'password' && errors[0].rule == 'confirm' ? <span>{errors[0].message}</span> : ""}
          </div>
          <div>
            <button onClick={(e) => handlePrevStep(e)}>Back</button>
            <button type="submit">Register</button>
          </div>
        </div>}
      </form>
    </div>
  )
}
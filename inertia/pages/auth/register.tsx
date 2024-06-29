import { useState, useEffect } from 'react'
import { Head, router } from '@inertiajs/react'

export default function Register(props: { errors: any[] }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  
  const [missingFields, setMissingFields] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

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
    if (form.name && form.email && form.password && form.passwordConfirmation) {
      router.post('/register', form)
    }
    const newMissingFields = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    if (form.name.trim() == '') {
      newMissingFields.name = "Please enter your full name"
    }
    if (form.email.trim() == '') {
      newMissingFields.email = "Please enter your email address"
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
      <Head title='Register' />
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
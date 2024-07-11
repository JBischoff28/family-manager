import { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";

export default function Login(props: { errors: any }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [missingFields, setMissingFields] = useState({
    password: '',
    email: '',
    username: '',
  })

  const [loginMethod, setLoginMethod] = useState('username')

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
    if (form.password && (form.username || form.email)) {
      router.post('/login', form)
    }
    const newMissingFields = {
      password: '',
      email: '',
      username: '',
    }
    if (form.email.trim() == '' && loginMethod == 'email') {
      newMissingFields.email = "Please enter your email address"
    }
    if (form.username.trim() == '' && loginMethod == 'username') {
      newMissingFields.username = "Please enter your username"
    }
    if (form.password.trim() == '') {
      newMissingFields.password = "Please enter your password"
    }
    setMissingFields(newMissingFields)
  }

  const handleLoginMethod = (e: any) => {
    e.preventDefault()
    if (loginMethod == 'username') {
      setLoginMethod('email')
    } else {
      setLoginMethod('username')
    }
  }

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.errors])

  return (
<div>
      <Head title='Login' />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {loginMethod === 'email' &&
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={form.email} onChange={handleChange} />
            {missingFields.email != '' && <span>{missingFields.email}</span>}
            {errors[0] && errors[0].field == 'email' ? <span>{errors[0].message}</span> : ""}
          </div>}
          {loginMethod === 'username' &&
          <div>
            <label htmlFor="username">Username</label>
            <input type="username" id="username" value={form.username} onChange={handleChange} />
            {missingFields.username != '' && <span>{missingFields.username}</span>}
            {errors[0] && errors[0].field == 'username' ? <span>{errors[0].message}</span> : ""}
          </div>}
        </div>
        <div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={form.password} onChange={handleChange} />
            {missingFields.password != '' && <span>{missingFields.password}</span>}
            {errors[0] && errors[0].field == 'password' && errors[0].rule != 'confirm' ? <span>{errors[0].message}</span>: ""}
          </div>
        </div>
        <div>
            <button onClick={(e) => handleLoginMethod(e)}>Login with {loginMethod == 'username' ? "email" : "username"}</button>
            <button type="submit">Login</button>
            <Link href="/register">Don't have an account? Register Here!</Link>
          </div>
      </form>
    </div>
  )
}
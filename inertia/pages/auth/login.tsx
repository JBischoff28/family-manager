import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

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
      router.post('/register', form)
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
      newMissingFields.password = "Please enter a new password"
    }
    setMissingFields(newMissingFields)
  }

  const handleLoginMethod = (e: any) => {
    const value = e.target.value
    setLoginMethod(value)
  }

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.errors])

  return (
    <div>

    </div>
  )
}
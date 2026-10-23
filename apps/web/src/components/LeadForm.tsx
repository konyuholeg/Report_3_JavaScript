'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { isValidEmail } from '@tracker/shared'
import { submitLead } from '../lib/api'

type FormState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'success'; email: string }
  | { status: 'error'; message: string }

export function LeadForm({ buttonLabel }: { buttonLabel: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setState({ status: 'error', message: 'Вкажіть коректний email' })
      return
    }
    setState({ status: 'sending' })
    const result = await submitLead({ email, source: 'landing-cta' })
    setState(
      result.ok
        ? { status: 'success', email: result.data.email }
        : { status: 'error', message: result.error.message },
    )
  }

  if (state.status === 'success') {
    return (
      <p className="form-note form-ok" role="status">
        Дякуємо! Ми напишемо на {state.email}.
      </p>
    )
  }

  return (
    <form className="lp-lead-form" onSubmit={onSubmit} noValidate>
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state.status === 'sending'}
      />
      <button type="submit" className="btn btn-primary" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Надсилаємо…' : buttonLabel}
      </button>
      {state.status === 'error' && (
        <p className="form-note form-err" role="alert">
          {state.message}
        </p>
      )}
    </form>
  )
}

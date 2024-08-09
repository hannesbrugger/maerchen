import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "../styles/forms.scss";


export default function Newsletter() {
  const [state, handleSubmit] = useForm("myzgwepp");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="form">

      <label className='subtitle' htmlFor="email">
        Email
      </label>
      <input
      className='input-container ic1'
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
                          <div className="cut cut-short"></div>

        <label className='subtitle' htmlFor="email">
        Name
      </label>
      <input

      className='input-container ic2'
        id="name"
        name="name"
      />
      <ValidationError 
        prefix="Name" 
        field="Name"
        errors={state.errors}
      />
      <button className="submit bg-glaucous" type="submit" disabled={state.submitting}>
        Anmelden
      </button>
    </form>
  );
}
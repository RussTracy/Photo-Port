import React, { useState } from 'react';
import { validateEmail } from '../../utils/helpers';

function ContactForm() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const { name, email, message } = formState;
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formState);
    };

    function handleChange(event) {
        // setFormState({ ...formState, name: event.target.value })
        if (event.target.name === 'email') {
            const isValid = validateEmail(event.target.value);
            console.log(isValid);

            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            }
            else {
                setErrorMessage('');
            }
        }
        else {
            if (!event.target.value.length) {
                setErrorMessage(`${event.target.name} is required.`)
            }
            else {
                setErrorMessage('');
            }
        }
        if (!errorMessage) {
            setFormState({ ...formState, [event.target.name]: event.target.value });
        }
        console.log('errorMessage', errorMessage);
    };

    return (
        <section>
            <h1 data-testid="h1tag">Contact me</h1>
            <form id="contact-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" defaultValue={name} onBlur={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email address:</label>
                    <input type="email" name="email" defaultValue={email} onBlur={handleChange} />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" rows="5" defaultValue={message} onBlur={handleChange} />
                    {errorMessage && (
                        <div>
                            <p className="error-text">{errorMessage}</p>
                        </div>
                    )}
                </div>
                <button data-testid="submit" type="submit">Submit</button>
            </form>
        </section>
    )
};


export default ContactForm;


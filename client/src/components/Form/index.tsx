import React, { useEffect, useRef, useState } from 'react';
import { IForm, IPollErrRef } from '../../types';
import { validateConditions } from '../../utils';
import styles from './Form.module.scss';

const Form = () => {

    const today = new Date().toISOString().split('T')[0];

    // Refs
    const dateInputRef = useRef<HTMLInputElement>(null);
    const formMessageRef = useRef<HTMLDivElement>(null);
    const pollErrRefs: IPollErrRef = {
        fullname: useRef<HTMLDivElement>(null),
        email: useRef<HTMLDivElement>(null),
        phoneNumber: useRef<HTMLDivElement>(null),
        dateOfBirth: useRef<HTMLDivElement>(null),
        message: useRef<HTMLDivElement>(null)
    };


    // initial State
    
    const initialState: IForm = {
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        message: ''
    };


    // States

    const [form, setForm] = useState<IForm>(initialState);
    const [isResponseWaiting, setResponseWaiting] = useState<boolean>(false);


    // functions

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        formMessageRef.current!.innerText = ''; // clear form message left from previous process

        // clear error info when typing input
        switch (e.target.name) {
            case 'fullName': pollErrRefs.fullname.current!.innerText = ''; break;
            case 'email': pollErrRefs.email.current!.innerText = ''; break;
            case 'phoneNumber': pollErrRefs.phoneNumber.current!.innerText = ''; break;
            case 'dateOfBirth': pollErrRefs.dateOfBirth.current!.innerText = ''; break;
            case 'message': pollErrRefs.message.current!.innerText = ''; break;
        }

        // handle state on change
        if (e.target.name === 'fullName') {
            setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponseWaiting(true); // submit button is disabled

        let isFullNameValid = false;
        let isEmailValid = false;
        let isPhoneNumberValid = false;
        let isDateOfBirth = false;
        let isMessageValid = false;

        // Full name validation
        if (form.fullName?.match(validateConditions.fullName) === null) {
            isFullNameValid = false;
            // error message below input
            pollErrRefs.fullname.current!.innerText = 'Between name and surname must be one space and both of them should be between 3-30 characters.'
        } else isFullNameValid = true;

        // Email validation
        if (form.email?.match(validateConditions.email) === null) {
            isEmailValid = false;
            // error message below input
            pollErrRefs.email.current!.innerText = 'Please check your email adress';
        } else isEmailValid = true;

        // Phone number Validation
        if (form.phoneNumber?.match(validateConditions.phoneNumber) === null) {
                
            isPhoneNumberValid = false;
            // error message below input
            pollErrRefs.phoneNumber.current!.innerText = 'Please check your phone number. Only russian phone numbers are accepted. Ex: +79999999999';
        } else isPhoneNumberValid = true;

        // Date of birth validation
        if (form.dateOfBirth === null || form.dateOfBirth === '') {
                
            isDateOfBirth = false;
            // error message below input
            pollErrRefs.dateOfBirth.current!.innerText = 'Please select your birth date';
        } else isDateOfBirth = true;

        // Message Validation
        if (form.message?.match(validateConditions.message) === null) {
                
            isMessageValid = false;
            // error message below input
            pollErrRefs.message.current!.innerText = 'Message must be between 3-300 characters';
        } else isMessageValid = true;


        // Submit Validation, if all conditions are true
        if (isFullNameValid && isEmailValid && isPhoneNumberValid && isDateOfBirth && isMessageValid) {

            e.currentTarget.reset();

            const url = 'http://localhost:5050/forms';
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
                    
                const data = await response.json();

                if (response.ok) {
                    setForm(initialState) // reset form state
                    formMessageRef.current!.innerText = data.message // successful message end of the form container
                } else if (!response.ok) {
                    formMessageRef.current!.innerText = data.message; // error message end of the form container
                }

                } catch (error: any) {
                    
                    console.error(await error);
                    formMessageRef.current!.innerText = 'Our server is under maintenence, please try again later';  // error message end of the form container
                } finally {
                    setTimeout(() => {
                        setResponseWaiting(false); // submit button is re-enabled
                    }, 2000);
                }
            } else { // if all conditions aren't true
                setTimeout(() => {
                    setResponseWaiting(false); // submit button is re-enabled
                }, 2000);
                formMessageRef.current!.innerText = 'Please correct the wrong entries'   // error message end of the form
            };
    };
    

    useEffect(() => {
        // Restrict future dates 
        dateInputRef.current?.setAttribute('max', today);
    }, [])

  return (
      <div className={styles.wrapper}>
            <form onSubmit={e => handleSubmit(e)} className={styles.form}>
            <h1 className={styles.formTitle}>Contact Form</h1>
                <div className={styles.formPoll}>
                  <label>Full Name</label>
                  <input style={{textTransform: 'uppercase'}} onChange={e => handleChangeForm(e)} type="text" name='fullName' />
                  <div ref={pollErrRefs.fullname} className={styles.formPollErr}></div>
                </div>
                <div className={styles.formPoll}>
                  <label>E-mail</label>
                  <input onChange={e => handleChangeForm(e)} type="text" name='email' />
                  <div ref={pollErrRefs.email} className={styles.formPollErr}></div>
                </div>
                <div className={styles.formPoll}>
                  <label>Phone Number</label>
                  <input onChange={e => handleChangeForm(e)} name='phoneNumber' />
                  <div ref={pollErrRefs.phoneNumber} className={styles.formPollErr}></div>
                </div>
                <div className={`${styles.formPoll} ${styles.datePoll}`}>
                  <label>Date Of Birth</label>
                  <input onChange={e => handleChangeForm(e)} name='dateOfBirth' type='date' ref={dateInputRef} />
                  <div ref={pollErrRefs.dateOfBirth} className={styles.formPollErr}></div>
                </div>
                <div className={styles.formPoll}>
                  <label>Message</label>
                  <textarea onChange={e => handleChangeForm(e)} name="message"/>
                  <div ref={pollErrRefs.message} className={styles.formPollErr}></div>
                </div>
                <div className={styles.btnWrapper}><button disabled={isResponseWaiting}>Submit Form</button></div>
                <div ref={formMessageRef} className={styles.formMessage}></div>
            </form>
      </div>
  )
}

export default Form
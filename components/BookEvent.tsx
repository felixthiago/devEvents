'use client'
import { useState } from "react";
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";


const BookEvent = ({eventID, slug}: {eventID: string, slug: string}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { success } = await createBooking({eventID, slug, email});

        if(success) {
            setSubmitted(true)
            posthog.capture('event_booked', {eventID, slug, email})
        }else{  
            console.error('Failed to book!');
            posthog.captureException('Booking creation failed')
        }
    }

    return (
        <div id = "book-event">
            {submitted ? (
                <p className = 'text-green-500 text-sm'>Thank you for booking!</p>
            ): (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" value = {email} placeholder = "Enter your email"/>
                    </div>
                    <button type="submit" className = 'button-submit'>Submit</button>
                </form>
            )}
        </div>
    )
}

export default BookEvent;
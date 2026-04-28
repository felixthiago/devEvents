'use server'
import connectDB from "../mongodb"
import { Booking } from "@/database";
import mongoose from "mongoose";

export const createBooking = async ({eventID, slug, email}: {eventID: string, slug: string, email: string}) => {
    try {
        await connectDB();
        await Booking.create({eventId: new mongoose.Types.ObjectId(eventID), email});

        return {success: true };

    } catch (error) {
        console.error('Booking creation failed:', error instanceof Error ? error.message : String(error));
        return {success: false };
    }
}   
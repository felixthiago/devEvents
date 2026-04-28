import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse} from "next/server";
import { Event } from "@/database";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const formData = await req.formData();
        
        let event;
        let tags: unknown;
        let agenda: unknown;

        try {
            event = Object.fromEntries(formData.entries());
            tags = JSON.parse(formData.get('tags') as string)
            agenda = JSON.parse(formData.get('agenda') as string)
        } catch (error) {
            return NextResponse.json({message: `Invalid json data format >> ${error}`}, {status: 400})
        }


        const file = formData.get('image') as File | null;

        if (!file) { return NextResponse.json({message: 'Image file is required'}, {status: 400})}
        


        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvents'}, (error, result) => {
                if(error) return reject(error);
                resolve(result);
            }).end(buffer);
        })

        event.image = (uploadResult as {secure_url: string}).secure_url;

        const createdEvent = await Event.create({...event, tags: tags, agenda: agenda})

        return NextResponse.json({message: 'Event created successfully', event: createdEvent}, {status: 201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Event creation failed ', error: error instanceof Error ? error.message : "Unknown Error"}, {status: 500})
    }
}
export async function GET(req: NextRequest){
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1});

        return NextResponse.json({message: "Events fetched successfully", events: events}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to fetch events", error: error instanceof Error ? error.message : "Unknown Error"}, {status: 500})
    }
}
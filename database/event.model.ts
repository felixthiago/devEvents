import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    mode: {
      type: String,
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be online, offline, or hybrid',
      },
      required: [true, 'Event mode is required'],
    },
    audience: {
      type: String,
      required: [true, 'Target audience is required'],
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: function (value: string[]) {
          return value && value.length > 0;
        },
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
    },
    tags: {
      type: [String],
      required: [true, 'At least one tag is required'],
      validate: {
        validator: function (value: string[]) {
          return value && value.length > 0;
        },
        message: 'Tags array must contain at least one tag',
      },
    },
  },
  { timestamps: true }
);

eventSchema.pre<IEvent>('save', async function () {
  if (this.isModified('title') || !this.slug) {
    this.slug = generateSlug(this.title);
  }

  if (this.isModified('date')) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format. Use YYYY-MM-DD');
    }
    this.date = parsedDate.toISOString().split('T')[0];
  }

  if (this.isModified('time')) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    if (!timeRegex.test(this.time)) {
      throw new Error('Invalid time format. Use HH:MM or HH:MM:SS');
    }
  }
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;

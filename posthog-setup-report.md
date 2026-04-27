<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvents Next.js App Router project. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new): Initializes PostHog on the client side using the Next.js 15.3+ instrumentation pattern. Enables session replay, error tracking, and debug mode in development. Requests are proxied through `/ingest` to avoid ad blockers.
- **`next.config.ts`** (updated): Added rewrite rules to proxy PostHog requests through the app (`/ingest/*` → `us.i.posthog.com`, `/ingest/static/*` and `/ingest/array/*` → `us-assets.i.posthog.com`). Also enabled `skipTrailingSlashRedirect` as required by PostHog.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture('explore_events_clicked')` when the user clicks the "Explore Events" hero button.
- **`components/EventCard.tsx`** (updated): Converted to a client component and added `posthog.capture('event_card_clicked', {...})` when a user clicks on a featured event card, with properties for `event_title`, `event_slug`, `event_location`, and `event_date`.
- **`.env.local`** (created): Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on a featured event card, indicating interest in a specific event | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/397185/dashboard/1509981)
- **Insight 1**: [Explore Events button clicks over time](https://us.posthog.com/project/397185/insights/nKGRULre)
- **Insight 2**: [Event card clicks over time](https://us.posthog.com/project/397185/insights/EBwZ47Op)
- **Insight 3**: [Explore → Event card conversion funnel](https://us.posthog.com/project/397185/insights/PCT5xlP3)
- **Insight 4**: [Most popular events by clicks](https://us.posthog.com/project/397185/insights/gQLf8ITM)
- **Insight 5**: [Total event card clicks](https://us.posthog.com/project/397185/insights/NIWGKBOs)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>

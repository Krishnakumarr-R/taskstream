// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

if (process.env.NODE_ENV === "production") {
  import("@sentry/nextjs").then((Sentry) =>
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
    })
  );
} else {
  console.log("🛑 Sentry disabled in development");
}
import * as Sentry from "@sentry/nextjs";


Sentry.init({
  dsn: "https://fc90c2564529b16e0292c3b7d1f921a5@o4510273360953344.ingest.us.sentry.io/4510273376681984",

   integrations: [
    // Add the Vercel AI SDK integration to sentry.server.config.ts
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
     Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

   
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1.0,
  

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

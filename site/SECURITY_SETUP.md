# Activating contact-form protection (no Cloud Functions required)

The code includes input limits, a honeypot, a minimum fill time, Firestore rules,
and Firebase App Check. App Check works directly with Firestore and does not
require Firebase Functions or the Blaze plan. The following deployment steps are required.

1. Create a reCAPTCHA v3 site key for the production domain.
2. Add `REACT_APP_RECAPTCHA_SITE_KEY` to the production build environment.
3. In Firebase Console > App Check, register the web app with reCAPTCHA v3.
4. Deploy the site, verify App Check metrics, then enable enforcement for Firestore.
5. Give only the administrator account the custom claim `{ admin: true }` using a
   trusted Admin SDK environment. Sign out and back in afterward.
6. Merge the `messages` block into the existing production Firestore rules if they
   also cover rooms, offers, or bookings. Unmatched collections in this file are denied.
7. Deploy with `firebase deploy --only firestore:rules`, then deploy Hosting.

Never put an Admin SDK service-account key in this React project or source control.

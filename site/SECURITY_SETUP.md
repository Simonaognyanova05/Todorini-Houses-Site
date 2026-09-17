# Activating contact-form protection (no Cloud Functions required)

The code includes input limits, a honeypot, a minimum fill time, Firestore rules,
and Firebase App Check. App Check works directly with Firestore and does not
require Firebase Functions or the Blaze plan. The following deployment steps are required.

1. Create a reCAPTCHA v3 site key for the production domain.
2. Add `REACT_APP_RECAPTCHA_SITE_KEY` to the production build environment.
3. In Firebase Console > App Check, register the web app with reCAPTCHA v3.
4. Deploy the site, verify App Check metrics, then enable enforcement for Firestore.
5. Administrator access requires Firebase sign-in with a verified email matching
   simonaognanova05@gmail.com or tkashti@abv.bg. No custom claims are required.
6. The rules cover rooms, offers, bookings and messages. Any other collection is denied.
7. Deploy only the merged rules and the matching frontend; see the booking rollout below.

Never put an Admin SDK service-account key in this React project or source control.

## Booking protection (Spark plan)

Bookings now validate names, phone, email, guest count, room selection and dates.
Dates are stored as Firestore timestamps at UTC midnight; the reservation list
already supports timestamps, and continues to read legacy string dates.
The booking form uses the contact form approach: a honeypot, five-second minimum
fill time, arithmetic challenge, checkbox, in-flight lock and ten-minute cooldown
stored separately in localStorage. The generated-text filter is shared with messages;
requirements allow at most one URL, but remain optional and may be short. These browser checks are bypassable;
they are NOT a server-side rate limit or an IP ban.

The bookings rules enforce the schema, allowed room choices, non-past dates,
departure after arrival and a server-generated creation time. They prevent the
malformed examples but cannot distinguish a bot submitting otherwise valid data.

Activation:
1. The owner supplied the current production rules: a recursive wildcard with
   allow read, write: if true. Replace that complete ruleset with the local file;
   do not retain the wildcard. It bypasses all collection-specific restrictions.
   The local file now covers every collection referenced by this site's code:
   rooms and offers are public-read/admin-write; bookings and messages are
   validated-public-create/admin-read-and-delete. Other paths are denied.
2. The owner designated simonaognanova05@gmail.com and tkashti@abv.bg as admins.
   isAdmin() requires a Firebase-authenticated session, email_verified == true,
   and an exact match to one of those addresses. No UID or custom claim is needed.
   Verify both accounts have completed email verification before publishing;
   sign out and back in after verification so the token contains the new status.
   Unverified accounts are intentionally denied administrative access.
   A signed-in user alone never qualifies as an administrator. The header's
   localStorage check is presentation only, not authorization.
3. Publish the new frontend and merged rules together in a short maintenance
   window. The old frontend submits strings and is incompatible with the new
   timestamp schema; ask open clients to refresh.
4. Set REACT_APP_RECAPTCHA_SITE_KEY for the production build and register the same
   reCAPTCHA v3 integration under Firebase Console > App Check. The existing
   src/config/firebase.js initializes it for production.
5. Verify legitimate booking, admin listing/deletion and other Firestore screens
   in App Check metrics BEFORE enabling Firestore enforcement. Enforcement
   applies to all Firestore requests, not only bookings.
6. Enable Firestore enforcement. Merely adding a site key is not enforcement.

No Cloud Functions or Blaze upgrade is required. App Check itself is no-cost;
the reCAPTCHA provider has quotas. Keep the project on Spark, check the provider
quota in its console, and do not enable paid billing for this setup. Protection
reduces abuse but is not a guarantee against all bots or quota exhaustion.

Production checks: a valid booking succeeds and is visible to the admin;
a direct write with a 1970 date, arbitrary room type or forged createdAt fails;
an unauthenticated read/delete fails; a request without a valid App Check token
fails after enforcement. Existing spam records are not automatically deleted.

References:
- https://firebase.google.com/docs/app-check/web/recaptcha-provider
- https://firebase.google.com/docs/app-check/enable-enforcement
- https://firebase.google.com/docs/projects/billing/firebase-pricing-plans
Admin access checks before rollout: both listed verified accounts may manage
rooms/offers and read/delete bookings/messages. An unverified listed account,
any other signed-in account, and an anonymous client must be denied those actions.
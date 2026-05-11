# Friends of Fort Getty Park Website

This is a simple static website for `www.friendsoffortgettypark.com`.

## Pages

- `index.html`: landing page and email signup
- `leadership.html`: Friends names page
- `signup-config.js`: public signup provider settings

## Next content to replace

- Add real park photos in `assets/`
- Add provided Friends names and decide how signed-up names should be published
- Connect the signup form to the selected mailing-list provider

## QR code

- `assets/friends-fort-getty-qr.png` points to `https://www.friendsoffortgettypark.com`
- Use this image for flyers, posters, meeting slides, and handouts.

## Signup provider setup

The site currently falls back to opening an email draft to `hello@friendsoffortgettypark.com`.

To connect Mailchimp, create audience fields for:

- `FULLNAME`
- `ADDRESS`
- `PHONE`
- `VOLUNTEER`
- `PARKIDEAS`

Keep `EMAIL` as the email field. Then copy the Mailchimp embedded form `action` URL into `signup-config.js`, change `provider` to `mailchimp`, and confirm that the `fieldNames` values match the audience merge tags.

## Suggested publishing path

For a first site, GitHub Pages is a good fit because this is static, simple, and easy to connect to a custom domain.

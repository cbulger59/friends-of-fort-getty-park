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

The site currently falls back to opening an email draft to `friendsoffortgettypark@gmail.com`.

The current Mailchimp embedded form uses these field names:

- `EMAIL` for Email Address
- `MMERGE7` for Full Name
- `MMERGE13` for Public Permission
- `MMERGE12` for Jamestown Street Address
- `MMERGE8` for Phone
- `MMERGE9` for Volunteer
- `MMERGE11` for Park Ideas

Mailchimp's hosted form displays these as `MERGE#`, but the embedded form post uses `MMERGE#` names for custom fields. Copy the Mailchimp embedded form `action` URL into `signup-config.js`, change `provider` to `mailchimp`, and confirm that the `fieldNames` values match the embedded form input names.

## Suggested publishing path

For a first site, GitHub Pages is a good fit because this is static, simple, and easy to connect to a custom domain.

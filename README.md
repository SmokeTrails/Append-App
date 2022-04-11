# Append App

# Deployment URL

The URL to our deployed app is: https://appendapp.herokuapp.com/

# To run the app:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To run our app locally, from the project root directory, run the following commands:
- `npm run local`

Open [http://localhost:5000](http://localhost:5000) to view the website in the browser.

# Instructions for logging in and using the app as a user:

The first page you will see is the login page, where you can use only the
following credentials to log in:
  - Username: user
  - Password: user

You can also create a new account from the login page by clicking the respective button.

Once you're logged in, you can use the following features:
- View and edit your profile (go to "My Profile")
- View communities that are recommended for you (On the Home page)
- Search for a particular user/community (using the search bar at the top of the Home page)
- View and add posts in a community (click the respective community's button to go to the community's homepage, then click on add post)
- Look at the user directory and view profiles of each user (using the "Directory" tab)

# Instructions for logging in and using the app as an admin:

The first page you will see is the login page, where you can use only the
following credentials to log in:
  - Username: admin
  - Password: admin

New admin accounts cannot be created. If you click the create account button and fill in
all the fields, a user account will be created.

Once you're logged in, you can use the following features:
- View profile of each user (in the "Admin" page, click on each user to go to their profile)
- Remove a user from the app (click the remove user button in the Admin Homepage)
- Send a warning to a user (click the send warning button in the Admin Homepage, or click on the warn user button in a post in a community)
- Send a request to a user to update their password (click on the reset password button in the Admin Homepage)
- View posts in a community (by navigating to the community homepage from the "Your communities" section in the sidebar)
- Remove a post in a community (by navigating to the community homepage from the "Your communities" section in the sidebar and clicking remove post from the respective post)
- You can also do what a user can do (such as search, view your profile, add a post, etc.)

# Third Party Libraries we used

- [@heroicons/react](https://github.com/tailwindlabs/heroicons): A set of 450+ free icons to use in various parts of our interface.
- [react-router](https://github.com/remix-run/react-router): A React routing library that handles navigation between pages.
- [react-number-format](https://github.com/s-yadav/react-number-format): A React library for rendering formatted numbers.
- [react-textarea-autosize](https://github.com/Andarist/react-textarea-autosize): A React library for creating textareas that automatically adjust their size to fit the content.

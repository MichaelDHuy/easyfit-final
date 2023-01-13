# Easyfit Booking App
## Project Description

The App utilizes React built-in and custom hooks and allows students/ users to purchase, register the suitable fitness classes. On the other hands, the apps also has admin function which allows managers/ admins to create, manage the students/ users, classes and schedule.

## Project Features
- Students/ users can create an account by email
- When users login to the server, the OTP login code will be sent to user's registered email.
- Users can purchase credits to register for the classes. Users can manage their schedule and classes on users dashboard.
- The app use the Stripe API to simulate the payment process. The random credit card number being used in this app is 4111-1111-1111-1111. In this app, one credit equals to 15 CAD
- Users can also cancel the classes they registered 24 hour before the start time. When they cancel, the credits will be refunded to the user's account.   
- The managers/ admins can log in by the admin dashboard with admin password. 
- Admin can create the new classes, manage the students in the classes. Admin also can cancel classes as well remove the students in student list
- In the apps, there are different class types. Each class type has different classes which were created by admins/ managers. Each class has the start and end time, number of available spots and number of credits to register

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```


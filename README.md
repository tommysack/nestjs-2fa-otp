# NestJS 2FA Boilerplate that supports Time-based OTP
This project contains both the users signup and the signin procedures.<br> 
The signup procedure requires simply the validation of email, likewise to update user's email.<br>
The signin procedure consists of two steps (2-factor authentication):<br>
1. The login step requires the user's credentials username/password, and that the user's email has been previously validated. If it is successful then it sends an email with <i>otp</i> code to validate the login in the next step. Furthermore it returns the <i>jwt_otp</i> code necessary to send the request in the next step. An expiration period can be set for both <i>otp</i> and <i>jwt_otp</i>.<br>
1. The validation step requires the <i>otp</i> in the request body and the <i>jwt_otp</i> in the request header (such as <i>Authorization: Bearer jwt_otp_value</i>).<br>
If it is successful then it returns the  <i>jwt_auth</i> code necessary to protect your app using Guard <i>JwtAuthGuard</i> that requires the <i>jwt_auth</i> in the request header (such as <i>Authorization: Bearer jwt_auth_value</i>). Also in this case it is possible to set an expiration period for <i>jwt_otp</i>.<br>

## Configuration
You can find all the configurations in <i>/config/env/</i> folder.<br>
For simplicity the <i>NODE_ENV</i> environment are setted before you starts the project with command <i>npm run start:environment</i>. The associations script/environment are in <i>package.json</i>. You can edit easily and set the <i>NODE_ENV</i> variable as you prefer.<br>
Here are some fields populated for demonstration purposes:<br/><br/>

```code
# App
APPLICATION_PORT=

# MongoDB 
MONGO_CONNECTION_DB=mongodb://mongodb-domain/mongodb-database

# Username and password pattern
USER_USERNAME_EREG=
USER_PASSWORD_EREG=

# Rounds for bcrypt the password
USER_PASSWORD_ROUNDS=10

# Otp
OTP_LOGIN_KEY=
OTP_LOGIN_EXPIRED_TIME=120

# Email validation
EMAILCODE_REGISTER_KEY=

# Jwt_otp 
JWT_OTP_KEY=
JWT_OTP_EXPIRATION_TIME=600s

# Jwt_auth
JWT_AUTH_KEY=jwtauthkey
JWT_AUTH_EXPIRATION_TIME=600s

# Mail
MAIL_TRANSPORT_HOST=
MAIL_TRANSPORT_PORT=
MAIL_TRANSPORT_AUTH_TYPE=
MAIL_TRANSPORT_AUTH_USER=
MAIL_TRANSPORT_AUTH_CLIENTID=
MAIL_TRANSPORT_AUTH_CLIENTSECRET=
MAIL_TRANSPORT_AUTH_REFRESHTOKEN=
MAIL_FROM_DEFAULT=

# Notification
NOTIFICATION_EMAILCODE_FROM=
NOTIFICATION_EMAILCODE_SUBJECT=Verify your email
NOTIFICATION_EMAILCODE_TEXT=Dear USERNAME, this is the code to verify your email: EMAIL_CODE

NOTIFICATION_EMAIL_ISVALID_FROM=
NOTIFICATION_EMAIL_ISVALID_SUBJECT=Your email is valid
NOTIFICATION_EMAIL_ISVALID_TEXT=Thanks USERNAME, your email is valid!

NOTIFICATION_OTP_FROM=
NOTIFICATION_OTP_SUBJECT=Verify your account
NOTIFICATION_OTP_TEXT=Dear USERNAME, this is your code to verify your access: OTP
```

## External library
The project uses some external libraries that requires the installation (see the next paragraph): Mongoose to store the users, otplib to generate the otp, bcrypt to hash the password, Passport as authentication middleware, Nodemailer to send notifications.<br> 
The collections will be created automatically when the app starts, you don't need to create.<br>
The notifier typically uses OAuth2 parameters that you can simply get it from your provider.<br><br>

## Installation

```bash
$ npm install
```

## Running

```bash
$ npm run start:local
$ npm run start:development
$ npm run start:production
```

 ## Test API using command line curl
 
Assuming we are in a local environment, then the domain is localhost and port is 3000.<br>

Register users:<br>
```bash
curl -X POST http://localhost:3000/signup/register -H "Content-Type: application/json" -d '{"name": "user-name", "surname": "user-surname", "username": "user-username", "emailTemp": "user-email", "password": "user-password"}'
```

Validate user's email:<br>
```bash
curl -X POST http://localhost:3000/signup/validate-email -H "Content-Type: application/json" -d '{"username": "user-username", "emailCode": "code-value"}'
```

Update user's data:<br>
```bash
curl -X POST http://localhost:3000/signup/update -H "Content-Type: application/json" -H "Authorization: Bearer jwt_auth_value" -d '{"name": "user-new-name", "surname": "user-new-surname", "emailTemp": "user-new-email", "password": "user-new-password"}'
```

Login:<br>
```bash
curl -X POST http://localhost:3000/signin/login -H "Content-Type: application/json" -d '{"username": "user-username", "password": "user-password"}' 
```

Validate user's otp:<br>
```bash
curl -X POST http://localhost:3000/signin/validate -H "Content-Type: application/json" -H "Authorization: Bearer jwt_otp_value" -d '{"otp": "otp-value"}' 
```

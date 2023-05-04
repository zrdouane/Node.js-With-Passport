# Node Passport Login

This is a simple Node.js authentication project using Passport.js, which is a popular authentication middleware for Node.js. It allows users to sign up, login, and logout of the application. This project uses MongoDB as the database and EJS as the templating engine.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine:

```
git clone https://github.com/zrdouane/Node.js-With-Passport.git
```

2. Install the required dependencies:

```
npm install
```

3. edit the `key.js` file in the config directory of the project and add the following environment variables:

```
module.exports = {
    MONGO_URI: 'Your key here!'
}
```

Replace `Your key here!` with your MongoDB connection string.

4. Start the development server:

```
npm run dev
```

The application will be running at `http://localhost:3000`.

## Features

- User authentication: allows users to sign up, login, and logout.
- Session management: uses express-session to manage user sessions.
- Password hashing: uses bcrypt to hash user passwords before storing them in the database.
- Flash messages: uses connect-flash to display error and success messages to users.

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [connect-flash](https://github.com/jaredhanson/connect-flash)
- [express-session](https://github.com/expressjs/session)

## Contributing

Contributions are welcome! If you find any bugs or want to contribute in any way, feel free to open an issue or submit a pull request.

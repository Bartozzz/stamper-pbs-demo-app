# QR Scanner

## Getting started

You'll need [`Expo CLI`](https://docs.expo.io/) installed on your machine in order to build and test this project:

```bash
npm install -g expo-cli
```

## Developing, testing on simulator

1. Install npm dependencies:

   ```bash
   $ npm install
   ```

2. Run Expo:

   ```bash
   $ expo start
   ```

3. Follow instructions in your terminal.

## Building standalone apps

1. Install npm dependencies:

   ```bash
   $ npm install
   ```

2. Configure [`app.json`](app.json):

   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.yourcompany.yourappname"
       },
       "android": {
         "package": "com.yourcompany.yourappname"
       }
     }
   }
   ```

3. Start the build:

   ```bash
   $ expo build:ios
   $ expo build:android
   ```

[Detailed steps](https://docs.expo.io/versions/latest/distribution/building-standalone-apps)

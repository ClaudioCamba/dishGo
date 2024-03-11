# DishGo - find the dish you've been craving 😋 🍽️

A user friendly Android app that that allows users to find a restaurant that serves a specific food item in their area.

## Demo

Watch the full demo on [YouTube](https://www.youtube.com/watch?v=yv9bBnSZhEs) ⭐

<div style="display: flex; gap: 10px"><img src="./assets/demo/faq.gif" width="100"/>
<img src="./assets/demo/location.gif" width="100"/>
<img src="./assets/demo/food-search.gif" width="100"/>
<img src="./assets/demo/list-results.gif" width="100"/>
<img src="./assets/demo/map-view.gif" width="100"/></div>


## Frontend

Built in React Native. Runs on Expo Go and Android Emulator.

## Database and API

Supabase hosts the database, storage and provides user authentication. Google Places API retrieves location details, directions and provides the map view

## Minimum Requirements to run DishGo

1. Supabase database and key

Note: the backend is not currently accessible to the public and requires setting up your own Supabase database and key (a guide to do this is TBC).

2.  Google Places API key

If you do not have one already, set one up by following these [docs](https://developers.google.com/maps/documentation/places/web-service/get-api-key).

3.  Android device with Expo installed 

Download Expo via the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US). If you do not have an Android device, you may be able to run the app on Android Emulator. Before downloading Android Emulator, please ensure your computer meets these [minimum requirements](https://developer.android.com/studio/run/emulator).

4. Node.js - version ^20.9.0

## How to run DishGo

1. Clone this repo 

2. Navigate into the created folder

```
cd dishGo

```

2. Install dependencies

```
npm install

```

3. Add API keys and link to database

Create a .env file in the root folder and re-assign the following variables with your API keys.

```
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_GOOGLE_API_KEY=your_google_places_key
```

4. Run app on android device

Install Expo Go on your Android device, start a local dishGo server by running the code below and following the instructions on your terminal.

```
npm run start
```

 For a detailed setup guide, see the [docs](https://reactnative.dev/docs/environment-setup).

## Future features

- Sort results by cuisine and dietary flags
- Liked dishes section
- Personalised UI e.g. first name, surname
- Random dish button

## Contributors

This app was ideated, planned and built in a co-ordinated effort between the following individuals:

- Charlie Tahsin [GitHub](https://github.com/ChazzaT18)
- Claudio Camba [GitHub](https://github.com/ClaudioCamba)
- Daniel Gruitt [GitHub](https://github.com/dan-gruitt)
- Simran Amin [GitHub](https://github.com/noepse)
- Hannah Tinsley McRink [GitHub](https://github.com/HannahTinsleyMcRink)

## Further credits and useful links

- Figma designs - Daniel Gruitt (see above)
- Uploading images to Supabase in React Native - Simon Grimm [YouTube tutorial](https://www.youtube.com/watch?v=am6w5zEDk_g)
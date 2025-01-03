# InvolveU

InvolveU is a mobile app written in React Native that allows students to see upcoming school events. If attended, students are awarded points and the student from each grade with the most points after every school quarter is awarded a prize corresponding to the number of points the student has.

Teachers in the school are tasked with adding students by username at each event to ensure validity.

If you're interested in the UI, the approximate design can be found on [Figma](https://www.figma.com/file/204M6ZpTg2ZjOxQPPir3OP/InvolveU).

## Api/Docs

The api is built with the [Django Rest Framework](https://www.django-rest-framework.org). It can be found at https://involveu.up.railway.app/api. Admins (teachers) can access the admin panel at https://involveu.up.railway.app/admin.

Code documentation for the mobile app can be found [here](https://pingu15.github.io/InvolveU).

## App

Prerequisites:

- node v18+
- npm v9+
- expo-cli and turtle-cli (can be installed with `npm install -g expo-cli turtle-cli`)

Install dependencies with npm:

```
npm i
```

Using expo, run:

```
npx expo start --tunnel
```

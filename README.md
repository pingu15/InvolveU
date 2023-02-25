# InvoleU

InvolveU is a mobile app written in React Native that allows students to see upcoming school events. If attended, students are awarded points and the student from each grade with the most points after every school quarter is awarded a prize corresponding to the number of points the student has.

Teachers in the school are tasked with adding students by username at each event to ensure validity.

The initial app design can be found at https://www.figma.com/file/204M6ZpTg2ZjOxQPPir3OP/InvolveU?node-id=0%3A1.

## Api

The api can be found at https://involeu.up.railway.app/api. Admins (teachers) can access the admin panel at https://involeu.up.railway.app/admin.

## App

Prerequisites:

- Node.js v[enter version]
- npm v[enter version]
- expo-cli and turtle-cli (can be installed with `npm install -g expo-cli turtle-cli`)

To run the app, clone the repository and enter the `app/` directory.

First run:

```
npm i
```

Using expo, run:

```
npx expo start --tunnel
```

# No Game

## Setup
- `npm install` install dependencies
- `npx expo start` start the app
- examine terminal output, press a / i / w to display app locally

## Todos
- [x] daily report context
- [] retrieve object with id from the realm database instead of query? doesn it even matter?
- [] how does intervalToDuraiton work, days not displayed correctly for >30
- [x] automatic goal setting
    - define the first goal when app first launched, to get rid of NaN label
    - automatically move on to next goal after completion

## Personal Notes
- `create-expo-app` create Expo project
- `npm run reset-project` to remove starter code
- `.d.ts` declaration files that only contain type information
- Realm for local nosql database
- make sure `ScrollView` imported from react native and not something else
- expo router >>> expo navigation
- REMEMBER to add `components` (or any other) folder to tailwind configs for styles

- `git checkout -b feature/home_page`
    - `git checkout` switch between branches
    - `-b` flag tells git to create a new branch if it doesn't exist already, and then switch to it

- use zustand for
    - convenient, scalable, global state management
    - eliminating context boiler plate code
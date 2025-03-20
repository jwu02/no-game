
# Todos
- [] retrieve object with id from the realm database instead of query? doesn it even matter?
- [] how does intervalToDuraiton work, days not displayed correctly for >30
- [x] automatic goal setting
    - define the first goal when app first launched, to get rid of NaN label
    - automatically move on to next goal after completion


## Notes
- `.d.ts` files e.g. interfaces
- `npm install realm @realm/react`
```
(NOBRIDGE) ERROR  Error: Expo Go does not contain the native module for the 'realm' package. To use native modules outside of what is packaged in Expo Go, create a development build:

npx expo install expo-dev-client
npx expo run:ios
```

- make sure `ScrollView` imported from react native and not something else
- expo router >>> expo navigation

- REMEMBER to add component folder to tailwind configs for styles


- `git checkout -b feature/home_page`
    - `git checkout` switch between branches
    - `-b` flag tells git to create a new branch if it doesn't exist already, and then switch to it
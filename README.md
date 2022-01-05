# ReactTSProject Template

## Set up
Rename the app for your project, if needed: 
`$ yarn rename <project-name>`

Go to tsconfig.json file and change the paths key:
`"@yourProjectName/*"` --> `"@<project-name>/*"`
Do the same for the package.json file in the src folder.
And use it for the project files import in src folder

Run the folllowing commands:

```shell
$ git clone <this_repo_url>
$ cd ReactTSProject
$ yarn install
$ yarn ios-gems
$ yarn android-gems
$ yarn pods
```

## Set up VSCode

Install the following plugins:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- [ES7 Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)

## Running the app

Start the application on Android:

```shell
$ yarn android
```

Start the application on iOS:

```shell
$ yarn ios
```

Once the application has been deployed to the device/simulator, you can restart the metro bundler running

`$ yarn start`

## Recommended tools

- [Cocoapods](https://github.com/CocoaPods/CocoaPods)
- [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint)
- [Prettier](https://prettier.io/)

## Linting

To preserve code styling, we add a pre-commit hook that will check the staged using `eslint`.

You can lint the code manually:

`$ yarn lint`

This will run against all files in the `src` folder.

To run the pre-commit hook manually:

`$ yarn lint-staged`

To fix lint errors:
`$ yarn lint:fix`

If you faced issue when committing, check the issues reported. Each issue should contain the violated rule. Go to [eslint rules](https://eslint.org/docs/rules/) page and check the rule documentation.

## Relevant technologies

- [React Native](https://facebook.github.io/react-native/docs/getting-started)
- [Redux-Saga](https://github.com/redux-saga/redux-saga)
- [React Navigation](https://github.com/react-navigation/react-navigation)
- [CircleCI](https://circleci.com/)

## App Structure

- **.circleci**: contains circleci setup
- **android**: contains android project
- **ios**: contains ios project
- **scripts**: contains scripts
- **src**: app code
  - **assets**: common resources
    - **colors**: app colors
    - **fonts**: app fonts
    - **images**: app images
    - **strings**: app strings
    - **styles**: app styles
    - **typography**: app type text styles
  - **config**: contains project configuration keys
  - **hooks**: contains custom hooks
  - **navigation**: app navigation setup here
  - **services**: add common global services here
  - **state**: app store setup here (managed with Redux)
    - **ducks**: ducks files following:
      - [Ducks Modular Redux](https://github.com/erikras/ducks-modular-redux)
      - [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)
    - **storeConfig**: App store, Root Reducer & Saga configurations
  - **utils**: helper methods
  - **views**: components declaration here
    - **atoms**: conatins app smallest components
    - **components**: conatins app components
    - **containers**: contains app screens

## Adding new images (example image in src/assets/images/)

- Name the image file with your naming style
- Add the image file to src/assets/images/
- Run `yarn images`

## Adding custom fonts (example font in src/assets/fonts/)

- Name the fonts file with its full name
- Add the fonts file to src/assets/fonts/
- Run `yarn link-pkgs`
- Run `yarn fonts`

## NOTES

- Don't manually edit files `src/assets/images/index.ts` and `src/assets/fonts/index.ts`. Instead, use scripts `yarn images` and `yarn fonts`.

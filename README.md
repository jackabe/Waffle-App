# Waffle App

Waffle App is an Android application built in [React-Native](https://facebook.github.io/react-native/), aiming to experdite the process of parking in car parks and provide a link between parking and shopping.

This application is to be used with the following other projects:
 - [Waffle Flask](https://gitlab.cs.cf.ac.uk/c1673207/waffle_flask) - Application server.
 - [Waffle Admin](https://gitlab.cs.cf.ac.uk/c1673207/waffle_admin) - Admin portal to manage car parks, etc.
 - [Waffle IoT](https://gitlab.cs.cf.ac.uk/c1632738/waffle_iot) - Repository for Raspberry Pi.
 - [Waffle Scanner](https://gitlab.cs.cf.ac.uk/c1673107/waffle_scanner) - Mock QR Scanner.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will require the following to run the application:

- [node.js](https://nodejs.org/en/) - Used for Node Package Manager (NPM) to install application dependencies.
- Android SDK - Used to build the applicaton
- Git - To clone the project

### Installing

1. Clone the project into your chosen directory with:
    ```
    git clone git@gitlab.cs.cf.ac.uk:c1673107/waffle_app.git
    ```
2. Open the project in your favourite IDE or editor and open the following file:
    ```
    ..\waffle_app\android\local.properties
    ```
3. Change the following line in your file to the path to your Android SDK.
    ```
    sdk.dir=C\:\\Users\\C1630186\\AppData\\Local\\Android\\Sdk
    ```
   Please use double slash (//) between directories if on windows.

4. Open a terminal in the root directory of the project (\waffle_app\) and run the following command:
    ```
    npm install
    ```
   This installs the project dependencies.

5. Once the dependencies have been installed, connect an Android device to your PC, enable debugging and dev tools on it and then enter the following command in your terminal:
    ```
    npm run build-android
    ```
   This builds and runs the application on the connected Android device. Once the build is complete you will be able to access the application (waffle_app) on the device and use it.

6. Error
   ```
    Failed to delete/parse google-services.json
    ```
    It is possible that the build could fail due to the google-services JSON file. If the above error occurs, first run the build command again. If it still failes, delete the file given in the error - 'android/build/generated/debug'
## Coding Styles

We have used [camelCase](https://google.github.io/styleguide/jsguide.html#naming-camel-case-defined) throughout the application, when naming variables and functions.

## Built With

* [React-Native](https://facebook.github.io/react-native/) - Framework
* [node.js](https://nodejs.org/en/) - Dependency Management
* [React-Native-CLI](https://facebook.github.io/react-native/docs/getting-started.html) - Used to bootstrap initial project.

## Authors

- [C1673207](http://www.subashpoudyal.info/) - Subash Poudyal (Project lead)
- [C1673107](https://www.linkedin.com/in/jack-allcock/) - Jack Allcock (Project Lead)
- [C1632738](https://www.linkedin.com/in/mert-gol/) - Mert Gol (Full Stack Developer)
- [C1630186](https://www.linkedin.com/in/mjonjones/) - Morgan Jones (FUll Stack Developer & Scrum-master)

## Acknowledgments

* [React-Native-Navigation](https://facebook.github.io/react-native/docs/navigation) - Used for app navigation.
* [React-Native-Elements](https://react-native-training.github.io/react-native-elements/) - Component library used for input fields, buttons, etc.
* This project was sponsored by [CloseComms (Known as 2132.io now)](https://2132.io/), in collaboration with the [National Software Academdy](https://www.cardiff.ac.uk/software-academy).

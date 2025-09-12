# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)

### Links

- URL: [https://florianstancioiu.github.io/weather-app/](https://florianstancioiu.github.io/weather-app/)

## My process

- **September 8th, 2025:** I created the github repo and I reused the contents of my calculator app solution because setting up React Testing Library to work correctly with Typescript is quite a pain. I created the component structure for the project and I also started working on the mobile version of the design.
- **September 9th, 2025:** I worked on the mobile version of the app, I picked up from where I left the design yesterday and I made my way through the app from top to bottom. I avoided implementing the functionality of the dropdowns or the search component, I just made them look like in the design.
- **September 10th, 2025:** I implemented the UnitsDropdown and DaysDropdown components, I don't think this will be their final version, meaning I will have to update them further to actually use them correctly but this is a first step. I'm happy with how DaysDropdown turned out and relatively happy with the UnitsDropdown - I think there's room for improvement here. I also started working on the desktop version - I created a first rough version, I made the mistake of creating a new breakpoint for desktop called `dsktp`, even though it's descriptive, the name is too long and might bother me in the future. I also added a screenshot which will also be replaced, on top of that I added some Open Graph tags so that people can see what they click on in posts on social media.
- **September 12th, 2025:** I added a `isLoading` prop for every single component that needed one, I also began work on implementing the API fetch calls.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with types
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - For testing
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [Vite](https://vite.dev/) - Build tool

### What I learned

### Continued development

I would also add [storybook](https://storybook.js.org/) to this project, I don't know if I will have time until the Frontendmentor Hackathon time runs out, but I think I will add it nonetheless.

### Useful resources

- [React JS close dropdown using onBlur function](https://stackoverflow.com/a/73699297/12159189) - This helped me create a custom hook that I used to close the dropdowns when the user clicks outside of the dropdowns

## Author

- Frontend Mentor - [@florianstancioiu](https://www.frontendmentor.io/profile/florianstancioiu)
- Threads - [@florianstancioiu01](https://www.threads.com/@florianstancioiu01)
- LinkedIn - [florianstancioiu](https://www.linkedin.com/in/florian-stancioiu-765661349/)
- freeCodeCamp - [florianstancioiu](https://www.freecodecamp.org/florianstancioiu)

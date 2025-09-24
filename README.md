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

- [x] Search for weather information by entering a location in the search bar
- [x] View current weather conditions including temperature, weather icon, and location details
- [x] See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- [x] Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- [x] View an hourly forecast showing temperature changes throughout the day
- [x] Switch between different days of the week using the day selector in the hourly forecast section
- [x] Toggle between Imperial and Metric measurement units via the units dropdown
- [ ] ~~Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown~~ I decided to not implement this feature because it would complicate the code base and almost the same functionality can be achieved using the imperial-metric toggle
- [x] View the optimal layout for the interface depending on their device's screen size
- [ ] See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)

### Links

- URL: [https://florianstancioiu.github.io/weather-app/](https://florianstancioiu.github.io/weather-app/)
- Storybook URL: [https://florianstancioiu.github.io/weather-app/storybook/](https://florianstancioiu.github.io/weather-app/storybook/)

## My process

- **September 8th, 2025:** I created the github repo and I reused the contents of my calculator app solution because setting up React Testing Library to work correctly with Typescript is quite a pain. I created the component structure for the project and I also started working on the mobile version of the design.
- **September 9th, 2025:** I worked on the mobile version of the app, I picked up from where I left the design yesterday and I made my way through the app from top to bottom. I avoided implementing the functionality of the dropdowns or the search component, I just made them look like in the design.
- **September 10th, 2025:** I implemented the UnitsDropdown and DaysDropdown components, I don't think this will be their final version, meaning I will have to update them further to actually use them correctly but this is a first step. I'm happy with how DaysDropdown turned out and relatively happy with the UnitsDropdown - I think there's room for improvement here. I also started working on the desktop version - I created a first rough version, I made the mistake of creating a new breakpoint for desktop called `dsktp`, even though it's descriptive, the name is too long and might bother me in the future. I also added a screenshot which will also be replaced, on top of that I added some Open Graph tags so that people can see what they click on in posts on social media.
- **September 12th, 2025:** I added a `isLoading` prop for every single component that needed one, I also began work on implementing the API fetch calls.
- **September 14th, 2025:** I made the existing HTML code more accessible and I also implemented the Search functionality for the Main area (I still have to work on displaying the _Feels Like_, _Humidity_, _Wind_ and _Precipitation_ sections)
- **September 15th, 2025:** I completed the functionality for today's weather section, the daily forecast section and the hourly forecast section. I still have some doubts about the hourly forecast section, it has been by far the trickiest of them all.
- **September 16th, 2025:** I implemented the no search results and the API error screens, I worked on the tablet version of the app and I also completed some TODOs that were left in the code base. I extracted all the fetch logic from the App.tsx into a custom hook named _useMeteoData_, also, I updated the said hook with the Geolocation API so that users can allow for their position to be read and used in fetch requests.
- **September 17th, 2025:** I removed the _reversedGeocoding_ function - the one that turned lat and long into human readable addresses. I fixed a problem with the _HourlyForecast_ component, on the initial load it was showing the wrong data, it was showing data for Sunday instead of the current day. I also started to work on the UnitsDropdown component but it's still not done, I wanted to make it as dynamic as possible but I think that's a bad idea and I should focus on other stuff in the next couple of days, like, on testing the components.
- **September 18th, 2025:** I added a debounce hook, I implemented the metric/imperial switch, I made the dropdowns keyboard accessible, I used chatgpt to create a github actions workflow that builds the app to the `root` dir of github pages, and the storybook build is placed in the `root/storybook` dir, also, I wrote a few _\*.stories.tsx_ files for my components.
- **September 19th, 2025:** I fixed a bug that occured when the user allows the page to retrieve the current location and then he/she switches to imperial units - the request to the API was not made - it is fixed now. I also added `*.stories.tsx` files to each and every single component, I still have to create some dummy data for DailyForecast and HourlyForecast stories, I leave that for another day (I tried to create the dummy data and it's more difficult to create than I initially thought).
- **September 21th, 2025:** I added the search dropdown, a dropdown that contains all previous searches that you can select from (the data is limited to 4 values and is stored using localStorage). I added the dummy data to HourlyForecast and DailyForecast stories, I also added the index page (App.tsx) in storybook.
- **September 21th, 2025:** I made the deploy.yml script run the tests when building the app on Github Pages. I improved how the app behaves when allowing (or blocking) the Geolocation Web API. I added tests to all the components in the `src/components` dir (I still haven't added a test file for App.tsx).

### Built with

- Semantic HTML5 markup
- Accessibility features
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with types
- [Storybook](https://storybook.js.org/) - Build, test & document components
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - For testing
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [Vite](https://vite.dev/) - Build tool

### What I learned

### Continued development

~~I would also add [storybook](https://storybook.js.org/) to this project, I don't know if I will have time until the Frontendmentor Hackathon time runs out, but I think I will add it nonetheless.~~ I added storybook.

### Useful resources

- [React JS close dropdown using onBlur function](https://stackoverflow.com/a/73699297/12159189) - This helped me create a custom hook that I used to close the dropdowns when the user clicks outside of the dropdowns
- [Destructuring nullable objects](https://stackoverflow.com/a/45210379/12159189) - This helped me solve a TS issue with destructuring nullable objects
- [Get all unique values in a JavaScript array (remove duplicates) [duplicate]](https://stackoverflow.com/a/14438954/12159189) - This helped me make an array with unique values
- [How do you display JavaScript datetime in 12 hour AM/PM format?](https://stackoverflow.com/a/36822046/12159189) - This helped me display hours in AM/PM format
- [Scroll back to the top of scrollable div](https://stackoverflow.com/a/10744324/12159189) - This helped me reset the scroll to the top of the hourly forecast section when selecting a different day
- [The Only Accessibility Video You Will Ever Need - Youtube](https://www.youtube.com/watch?v=2oiBKSjOOFE) - This helped me understand accessibility for web pages
- ~~[Geoapify Location Platform: Maps, Geocoding, Routing, and APIs](https://www.geoapify.com/) - This helped me do a reverse geocode (turn latitude and longitude into an address) when using the Geolocation Web API~~ I ended up not using this
- [Bug: too hard to fix "Cannot update a component from inside the function body of a different component."](https://github.com/facebook/react/issues/18178#issuecomment-595846312) - I keep on seeing this bug when I'm trying to set the data of the UnitsDropdown as a prop instead of a state call, more specifically when I'm trying to update the state that is passed as a prop, it might prove useful to read about it in the future.
- [TypeScript: Remove a Property from an Object](https://stackabuse.com/bytes/typescript-remove-a-property-from-an-object/) - This helped me remove a property from an object in Typescript
- [useId](https://react.dev/reference/react/useId) - This helped me create ids for making the custom dropdowns more accessible
- [Wrap stories with extra markup](https://storybook.js.org/docs/writing-stories/decorators#wrap-stories-with-extra-markup) - This helped me pass accessibility for single list elements in Storybook
- [How to set <body> classes?](https://github.com/storybookjs/storybook/issues/1672#issuecomment-1520635802) - This helped me add custom classes to the body tag in storybook
- [What's the best way to convert a number to a string in JavaScript?](https://stackoverflow.com/a/5765406/12159189) - This helped turn a number variable to string
- [Pressing enter to submit form in react-testing-library does not work](https://stackoverflow.com/a/79562298/12159189) - This helped me change the text of an input element in tests
- [fireEvent.keyDown not working as expected on my Jest + React Testing Library test](https://stackoverflow.com/a/59590889/12159189) - This helped fire an enter key in a input in tests
- [Dynamic attribute in ReactJS](https://stackoverflow.com/a/47425958/12159189) - This helped me add a dynamic attribute in JSX
- [How to make a test that will wait 5 seconds before check element appearance (React testing lib)](https://stackoverflow.com/a/70881371/12159189) - This helped me wait for a timer in test files

## Author

- Frontend Mentor - [@florianstancioiu](https://www.frontendmentor.io/profile/florianstancioiu)
- Threads - [@florianstancioiu01](https://www.threads.com/@florianstancioiu01)
- LinkedIn - [florianstancioiu](https://www.linkedin.com/in/florian-stancioiu-765661349/)
- freeCodeCamp - [florianstancioiu](https://www.freecodecamp.org/florianstancioiu)

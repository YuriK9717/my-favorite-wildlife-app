# My favorite wildlife app

My favorite wildlife app is a web application that allows users to create a list of their favorite animals, rate them, and select preferred attributes. The project is built using React, Tailwind CSS, and connects to the Animals API for retrieving animal data. Data caching is implemented for improved performance, and local storage is utilized to save the user's favorite animal list.

## Technologies Used

- **React:** The project is developed using the React library to create a dynamic and responsive user interface.

- **Tailwind CSS:** Tailwind CSS is employed for styling the UI, providing a clean and modern design.

- **Animals API - API Ninjas:** The application retrieves information about different animals from the Animals API, allowing users to explore and select their favorites.

- **Jest Tests:** Unit tests are implemented using Jest to ensure the reliability and correctness of the application's components and functionality.

- **Local Storage:** Local storage is utilized to store and persist the user's favorite animal list, ensuring data is retained between sessions.

## Features

- **Favorite Animal List:** Users can create and manage a list of their favorite animals with a maximum limit of 20.

- **Rating:** Users can rate each animal based on their preferences.

- **Attribute Selection:** Users can select and customize attributes(characteristics) for each animal, making the experience more personalized.

- **Data Caching:** To enhance performance, the application caches data from the Animals API, providing a seamless and quick user experience.

- **Limitation on Favorite Animals:** To keep the application lightweight and user-friendly, a maximum limit of 20 favorite animals is imposed.

## Application in Action

![Main page](/screenshots/screenshot01.png)
![Main page with search result](/screenshots/screenshot02.png)
![Favorite animal list page](/screenshots/screenshot03.png)

## Test Coverage

The project has a comprehensive test suite that covers various components and contexts. Below is a summary of the test coverage:

------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------|---------|----------|---------|---------|-------------------
All files                     |   93.75 |    72.09 |   85.71 |   93.75 |
 components                   |   93.03 |    71.42 |   84.61 |   93.03 |
  AnimalListFaveAndRating.jsx |   80.95 |    44.44 |      60 |   80.95 | 25-31,47-51
  LikeAndDislikeButton.jsx    |   96.15 |     64.7 |     100 |   96.15 | 24,28,54,67
  Rating.jsx                  |     100 |      100 |     100 |     100 |
  SearchBar.jsx               |   94.44 |    83.33 |     100 |   94.44 | 41-44
 contexts                     |     100 |      100 |     100 |     100 |
  GlobalContext.jsx           |     100 |      100 |     100 |     100 |
------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 4 passed, 4 total
Tests:  9 passed, 9 total
Snapshots: 0 total
Time:  3.395 s


## Development Overview

### Design Decisions:
When crafting the components and context, I chose to adopt a modular structure, emphasizing maintainability. Additionally, I implemented a selective attribute display strategy, limiting the stored data list length to ensure the application remains lightweight and performs optimally. The design philosophy also prioritizes simplicity in the user interface to enhance user experience.

### Constraints and Considerations:
The present implementation faces challenges in efficiently managing substantial datasets from the API. Relying solely on local storage for data storage is suboptimal for web performance, and this decision may adversely affect overall efficiency. There is room for improvement in terms of performance optimization, as testing procedures are not currently comprehensive. Additionally, the app's styling may not be fully responsive on smaller screens. 

### Wishlist:
- Implement pagination to fetch large datasets efficiently.
- Enhance responsiveness for a seamless user experience across various devices.
- Implement tests for the entire codebase.


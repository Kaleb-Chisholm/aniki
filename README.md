# Aniki

Aniki is an online wikipedia designed to help you discover new (and old) anime/manga for you to watch/read. You can either search for specific titles and filter by genre, or find the top trending, popular, rated, and favourited anime/manga. 

NOTE: Aniki is a work in progress and still has several "undesired traits". It's also missing several planned future features. Undesired traits and planned features are listed below in their respective areas.

Aniki is a personal project and I've been developing it mainly as a way to teach myself ReactJS.

## How it was built

Aniki was build using [ReactJS](https://reactjs.org/), [Chakra-UI](https://chakra-ui.com/) and uses the 
[AniList](https://anilist.gitbook.io/anilist-apiv2-docs/) API which utilizes [GraphQL](https://graphql.org/). It works by taking user input either through a search form or buttons and makes the request to the API which returns the desired information about specific titles. The AniList API was chosen because it allows for requests that search for an anime/manga title rather and an ID. This made it easier when letting the user search for an anime/manga.

## Current Features
Currently, Aniki has the following features:
1. Search for anime/manga titles
2. Sort anime/manga search results by different attributes
3. Filter anime/manga search results by genre
4. Browse top trending, rated, favourited, and popular anime/manga 
5. Results are displayed across pages for the user to navigate through
6. Results are not lost on page refresh

## File structure and layout
Following typical file structure of a react app, Aniki's src folder is split into "pages", "containers", and "components". 
```bash
├───components
│   ├───anime
│   └───manga
├───containers
│   ├───anime
│   └───manga
├───context
├───pages
├───search
└───styles
```

Components and containers contain seperate folders of functional components which relate to each of the main categories in Aniki. The "anime" folders contain any components/containers for anime interactions, and the same applies for the "manga" folder. The "context" folder contains context for my "SearchProvider", which is used for GraphQL queries and located under the "search" folder.

## Running the App
1. Clone the repository ```git clone https://github.com/Kaleb-Chisholm/photo-caption-generator.git```
2. Navigate into the newly cloned repository and install dependencies using ```npm ci```
3. Run the app using ```npm start```
4. Go to localhost:3000 in your web browser

## Planned core features (Wishlist)
The following are features that I plan on adding to Aniki:
1. Browse Seasonal anime + filter by season and genre. Implemented similar to how "Top Anime" is.
2. Implement search history so the user can navigate between searches using back/forward buttons in browser. I plan to place the search query in the URL so that each search is a unique URL instead of all searches leading to "/top-anime".
3. Add quick options to landing page so the user can quickly click to view top trending or popular anime/manga. This will also likely require using the URL to take the user straight to "top trending" for anime instead of to just the "/top-anime" page. 
4. A back-end database that holds user data for accounts.
5. A user profile/account with authentication.
7. Manga and anime lists that the user can create to track their shows and books.

## Undesired traits + Known bugs/issues
There are no known bugs that impact the functionality of Aniki. However, there are some things about Aniki that, although work, I want to change to be more efficient.

1. API Limitation: I would like to find an alternative API that allows requests that involve searching for anime/manga title. While this API offers everything I need, GraphQL is not a strong point of mine and prior to Aniki, I had no experience with GraphQL. From my limited knowledge, I've gathered that the AniList API doesn't handle "undefined" or "null" variables in queries. This means I had to create a different query for each use case instead of one query with optional variables.
2. I would like to modularize my SearchProvider and split up its contents into smaller Providers.
3. I'm a perfectionist when it comes to writing clean code. Since I've been learning a significant amount during this project, once I reach a higher level of understanding in ReactJS, I would like to go back and see if there are any more complex ways to reduce code duplication, and make the project source code better.

NOTE: There is one TypeError that appears in the console when refreshing any of the results page. I know the source of this error, however, I have not found a way to fix it as it doesn't impact the functionality of Aniki.


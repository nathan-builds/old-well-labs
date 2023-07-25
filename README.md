# Steps to run
Prerequisite: Node installed on system from https://nodejs.org/en/download
1. Clone the repo
2. cd into old-well-labs/stock-searcher
3. Run the command ``` npm install ```
4. Run the command ``` npm run dev ```
5. Go to http://localhost:3000


# Design Considerations:
Each component has been as designed in a way that makes it reusable in any part of the application. The auto complete search bar has  essentially been 
"faked"  by providing a list of about 10,000 common stock tickers. In a real application, the app would make requests to the backend
at keystroke intervals to populate the auto complete search feature but with the limitations of requests on the basic Alpha Vantage API tier, this was not possible. If there
are any API issues to to the rate limiting of the basic tier a dialog will prompt you.

# Authentication/Authorization
I put in a quick framework for handling authentication and authorization using next-auth with NextJS in pages/api/auth/[...nextauth].ts Depending on the loading strategy, this can be done client or server side with NextJS, I have it set up quickly on the client side. I also added a couple methods that are commented 
out that can attach JWT tokens to the sessions. In index.tsx I have the useSession() hook which can then determine if the user exists, and then can be used to take certain actions on the page such as displaying the content if authenticated or redirecting to a login page. If there is a JWT on the session, the token can then be used in all requests to the back end for authorization against endpoints

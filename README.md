SET UP AND RUNNING:

Install node

Install Packages:
    npm install express
    npm install path
    npm install body-parser
    npm install multer

Run the Server:
    npm start

Direct Browser to localhost:8080
Enter time fragments into text field and submit via "Calculate UVT"

Notes:
    Time fragment sets should be entered in sequences of start time then end time, with a comma inbetween, and a comma separating the fragment sets as well. This should result in just a series of comma separated numbers and nothing more.

    Errors will be displayed if in a set of time stamps the first time is larger than the second, as well as if non-numeric characters are entered.


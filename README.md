SET UP AND RUNNING:

Install node

Install Packages:<br>
npm install body-parser<br>
npm install express<br>
npm install mocah <br>
npm install multer<br>
npm install path<br>
npm install supertest<br>

Run the Tests:<br>
    npm test
    
Run the Server:<br>
    npm start

Direct Browser to localhost:8080
Enter time fragments into text field and submit via "Calculate UVT"

NOTES:<br>
Time fragment sets should be entered in sequences of start time then end time, with a comma inbetween, and a comma separating the fragment sets as well. This should result in just a series of comma separated numbers and nothing more.<br><br>
Errors will be displayed if in a set of time stamps the first time is larger than the second, as well as if non-numeric characters are entered.<br><br>
For testing, I was able to verify endpoint statuses, but had to manually verify output.
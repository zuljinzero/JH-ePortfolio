# **Joseph Helmuth's ePortfolio**

### **Table of Contents**
1. Professional Self-Assessment
2. Code Review
3. Software Design and Engineering
4. Algorithms and Data Structure
5. Databases


### **1. Professional Self-Assessment**

While in the computer science program at Southern New Hampshire University, I have gained experience with many programming languages and libraries. I excel at quickly learning new programming languages and libraries, as well as converting code from one programming language to another while maintaining coding best practices. I have spent time utilizing machine learning while discovering the most accurate algorithms for each set of data. I have learned to always consider security, data integrity, readability, and collaboration. Within the computer science program, I have learned the importance of knowing when to seek answers and when to create my own solutions while being aware of my strengths and weaknesses. To not give up and to push through any roadblocks. To learn and grow from my failures as much as from my successes.

The artifact that I chose for this portfolio is a login application with a database. I created this artifact in March 2022 to display my skills and abilities learned in the computer science program. This artifact displays my skills and abilities in the following three categories: Software Design and Engineering, Algorithm and Data Structures, and Databases. The original code files for the artifact are [login_app.py](Original/login_app.py) and [data_queries.py](Original/data_queries.py).

In this portfolio I have included details on enhancements that I planned and completed for the artifact based on the mentioned categories. The code files after enhancements were completed are [login_app.js](Enhanced/login_app.js), [data_queries.js](Enhanced/data_queries.js), and [index.html](Enhanced/index.html).

### **2. Code Review**

I have included a recording of my code review for the artifact [here](https://youtu.be/Fi0Leo_5mdI). The code review covers the functionality of the original artifact as well as my planned enhancements. The implementation of the artifact enhancements is covered in the sections below.


### **3. Software Design and Engineering**

The artifact login application with database was written in Python incorporating the Pandas and SQLite libraries. This artifact allows the user to: login, create new user, and change password. Once logged in, the user gains access to the main menu which allows for create, read, update, and delete operations within the local database. The main menu features options to: display all customer records, add a new customer record, add new customer records by uploading an Excel file, search database for customer records, update customer account balance, and delete customer record.

To enhance the artifact, I employed strategies for building collaborative environments that enable diverse audiences to support organizational decision making in the field of computer science by converting the application to JavaScript and HTML, allowing users to access the application from any computer via internet browser.

I designed, developed, and delivered professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts by writing readable code and comments that consider collaboration.

### **List of completed enhancements**
- Convert code from Python to JavaScript and HTML
- Usability within internet browser
- Easy to understand code comments
- Easy to follow user communications and menus


Reflecting on the process of enhancing and modifying the artifact I learned how to: import/export functions from a separate JavaScript file, create an HTML file to allow JavaScript code to run in an internet browser, create pop-up windows in an internet browser that allow for user input, create a local live server with Visual Studio Code.

The challenges that I faced were: issues importing/exporting functions from a separate JavaScript file as the original import code caused the application to halt before running any functions because I did not know I needed to specify the exporting file as type=”module” in the index.html file, issues running the application after the previous issue was resolved due to opening the indext.html file instead of running the index.html file through a local live server since the application relies on a second JavaScript file.


### **4. Algorithms and Data Structure**

To enhance the artifact, I designed and evaluated computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design by adding new user options to update user access levels and transfer funds between customer accounts. I also created an HTML file loader and JavaScript event listener for accepting Excel files to add multiple customer records.

I developed a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources by adding security checks that test all strings and numbers for special characters and length before they are passed to the database functions.

### **List of completed enhancements**
- New function that transfers a user specified amount of funds between two customers
- New function that updates user access level
- New functions that check user entered strings and numbers for special characters and length
- New function that checks user uploaded Excel files for special characters and length
- HTML Excel file loader
- Event listener for Excel file loading and processing


Reflecting on the process of enhancing and modifying the artifact I learned how to: use JavaScript to accept Excel file uploads and store the contents in an array, utilize an Excel file parser, create an input object with HTML, create an event listener in JavaScript, check if a number variable is not a number (NaN).

The challenges that I faced were: finding an Excel file parser that worked correctly for what I needed, issues checking if strings converted to numbers were not a number (NaN) as they were still identified as a number unless isNaN() is used.


### **5. Databases**

To enhance the artifact, I demonstrated an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals by converting the local database to an online MongoDB Atlas database and converting SQL queries to NoSQL queries within "try, catch, finally" statements that connect and close the database client while catching errors.

### **List of completed enhancements**
- Convert local database to online MongoDB Atlas database
- Convert SQL queries to NoSQL
- Implement "try, catch, finally" statements
- Query for customer funds transfer
- Query for updating user access level


Reflecting on the process of enhancing and modifying the artifact I learned how to: import MongoDB Atlas database in place of a local database, convert my previous SQL queries NoSQL queries, use “try, catch, finally”, use async and await when communicating with an online database, round to two decimals in JavaScript.

The challenges that I faced were: importing MongoDB functions into JavaScript to be used in a browser, using parseFloat().toFix(2) converts the float to a string so I had to embed it with parseFloat(parseFloat().toFix(2)) to end up as a float. 

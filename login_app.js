// Import data_queries.js assigning dqueries to call exported functions
import * as dqueries from './data_queries.js';


// --- Security checks for user input --- ///

// Checks strings for length and special characters
function checkForSpecial(sent_string) {
  // Defines special characters
  const special_chars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  // Tests string for special characters
  if (special_chars.test(sent_string)) {
    // If special characters are found return false
    return false;
  } else {
    // If no special characters check string length
    if (sent_string.length >= 30) {
      // If length over 29 return false
      return false;
    } else {
      return true;
    }
  }
}

// Checking numbers for length and special characters
function checkNumberForSpecial(sent_number) {
  // Defines special characters except periods and commas
  const special_chars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;

  // Tests numbers forspecial characters
  if (special_chars.test(sent_number)) {
    // if special characters are found return false
    return false;
  } else {
    // if no special characters check number length
    if (sent_number.length >= 30) {
      // if length over 29 return false
      return false;
    } else {
      return true;
    }
  }
}

// Checks data in uploaded file for length and special characters
function checkFileSpecial(file_array) {
  // Defines special characters except periods and commas
  const special_chars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
  // Initiate issue_count variable with 0
  var issue_count = Number(0);

  // Loops through data in the uploaded file
  for (let i = 0; i < file_array.length; i++) {
    for (let j = 0; j < file_array[i].length; j++) {
      // If special character is found add 1 to issue_count
      if (special_chars.test(file_array[i][j])) {
        issue_count++;
      } else {
        // If length of data is greater than 29 add 1 to issue_count
        if (file_array[i][j].length >= 30) {
          issue_count++;
        }
      }
    }
  }

  // If no issues found return true
  if (issue_count == 0) {
    return true;
  } else {
    return false;
  }
}

// Error messages for user input
const file_error = "Each cell within the file must be less than 30 characters and can not include special characters except for periods and commas.\n";
const error_message = " must be less than 30 characters and can not include special characters.\n";
const error_number = " must be a number.\n";


// --- LOGIN MENU --- //

// Function allowing user to login, create new user, and change password
function loginMenu() {
  // Display login menu
  const login_menu = "___LOGIN_MENU___\n1: Login\n2: Enter new user\n3: Change password\n0: Quit\n\n";
  // Menu choice prompt
  var login_choice = Number(prompt(login_menu + "Enter a number: "));

  // Switch statement for login menu choice
  switch(login_choice) {

    // Choice 1 "Login"
    case 1:
      // Username prompt
      var username = prompt("Enter username: ");
      // Username security check
      if (checkForSpecial(username)) {
        // Password prompt
        var password = prompt("Enter password: ");
        // Password security check
        if (checkForSpecial(password)) {
          // Login with username and password
          if (dqueries.loginUser(username, password)) {
            // Access level check
            if (dqueries.loginAccessCheck(username, password)){
              // Access level >= 8
              mainMenu();
            } else {
              // Access level < 8
              mainMenuLimited();
            }
          } else {
            // Username and password not found or do not match
            alert("Incorrect username or password...");
            loginMenu();
          }
        } else {
          // Password fails security check
          alert("Password" + error_message);
          loginMenu();
        }
      } else {
        // Username fails security check
        alert("Username" + error_message);
        loginMenu();
      }
      break;

    // Choice 2 "Enter new user"
    case 2:
      var username = prompt("Enter new username: ");
      if (checkForSpecial(username)) {
        var password = prompt("Enter new password: ");
        if (checkForSpecial(password)) {
          // Add user to database
          dqueries.addUser(username, password);
          loginMenu();
        } else {
          alert("Password" + error_message);
          loginMenu();
        }
      } else {
        alert("Username" + error_message);
        loginMenu();
      }
      break;
    
    // Choice 3 "Change password"
    case 3:
      var username = prompt("Enter username: ");
      if (checkForSpecial(username)) {
        var password = prompt("Enter current password: ");
        if (checkForSpecial(password)) {
          var new_password = prompt("Enter new password: ");
          if (checkForSpecial(new_password)) {
            // Send password change to database
            dqueries.changePassword(username, password, new_password);
            loginMenu();
          } else {
            alert("Password" + error_message);
            loginMenu();
          }
        } else {
          alert("Password" + error_message);
          loginMenu();
        }
      } else {
        alert("Username" + error_message);
        loginMenu();
      }
      break;

    
    // Choice 0 "Quit"
    case 0:
      // Displays close browser message
      alert("Please close this browser tab...");
      break;

    // Choice incorrect
    default:
      alert("Your choice is not one of the options.\n\n");
      loginMenu();
  }
}


// --- MAIN MENU --- //

// CRUD operations for the database
function mainMenu() {
  // main menu for access level 8 to 10
  const main_menu = "___MAIN_MENU___\n1: Display all\n2: Add record\n3: Add records from a file\n4: Search for record\n5: Update amount\n6: Delete record\n7: Transfer funds\n8: Update user access level\n0: Logout\n\n";
  var main_choice = Number(prompt(main_menu + "Enter a number: "));

  switch(main_choice) {
    // Choice 1 "Display all"
    case 1:
      dqueries.displayAllRecords();
      mainMenu();
      break;

    // Choice 2 "Add record"
    case 2:
      var customer_name = prompt("Enter customer name: ");
      if (checkForSpecial(customer_name)) {
        var account_number = Number(prompt("Enter new account number: "));
        // Number check account number
        if (!Number.isNaN(account_number)) {
          if (checkNumberForSpecial(account_number)) {
            var account_balance = parseFloat(prompt("Enter opening balance: "));
            if (!isNaN(account_balance)) {
              if (checkNumberForSpecial(account_balance)) {
                // Add new record to database
                dqueries.addNewRecord(customer_name, account_number, account_balance);
                mainMenu();
              } else {
                alert("Opening balance" + error_message);
                mainMenu();
              }
            } else {
              alert("Opening balance" + error_number);
              mainMenu();
            }
          } else {
            alert("Account number" + error_message);
            mainMenu();
          }
        } else {
          alert("Account number" + error_number);
          mainMenu();
        }
      } else {
        alert("Customer name" + error_message);
        mainMenu();
      }
      break;

    // Choice 3 "Add records from a file"
    case 3:
      alert("Click \"OK\".\nThen click \"Choose File\" to select an Excel file to upload.");    
      // Triggered by file selection
      document.getElementById("records").onchange = (evt) => {
        var reader = new FileReader();

        // Event listener for file loaded
        reader.addEventListener("loadend", (evt) => {
          var workbook = XLSX.read(evt.target.result, {type: "binary"}),
            worksheet = workbook.Sheets[workbook.SheetNames[0]],
            range = XLSX.utils.decode_range(worksheet["!ref"]);

          // Place file contents into array with comma delimited
          var newRecordsFile = [];
          for (let row=range.s.r; row<=range.e.r; row++) {
            let i = newRecordsFile.length;
            newRecordsFile.push([]);
            for (let col=range.s.c; col<=range.e.c; col++) {
              let cell = worksheet[XLSX.utils.encode_cell({r:row, c:col})];
              newRecordsFile[i].push(cell.v);
            }
          }
          
          // File content security check
          if (checkFileSpecial(newRecordsFile)) {
            // Add records from file to database
            dqueries.addNewRecordsFile(newRecordsFile);
            mainMenu();
          } else {
            alert(file_error);
            mainMenu();
          }
        });
        // Read file contents and trigger "loadend"
        reader.readAsArrayBuffer(evt.target.files[0]);
      };
      break;

    // Choice 4 "Search for record"
    case 4:
      var account_number = Number(prompt("Enter account number: "));
      if (!Number.isNaN(account_number)) {
        if (checkNumberForSpecial(account_number)) {
          // Search database for record
          dqueries.searchDatabase(account_number);
          mainMenu();
        } else {
          alert("Account number" + error_message);
          mainMenu();
        }
      } else {
        alert("Account number" + error_number);
        mainMenu();
      }
      break;

    // Choice 5 "Update account balance"
    case 5:
      var account_number = Number(prompt("Enter account number to update: "));
      if (!Number.isNaN(account_number)) {
        if (checkNumberForSpecial(account_number)) {
          var account_balance = parseFloat(prompt("Enter new balance: "));
          if (!isNaN(account_balance)) {
            if (checkNumberForSpecial(account_balance)) {
              // Update account balance in database
              dqueries.updateBalance(account_number, account_balance);
              mainMenu();
            } else {
              alert("New balance" + error_message);
              mainMenu();
            }
          } else {
            alert("New balance" + error_number);
            mainMenu();
          }
        } else {
          alert("Account number" + error_message);
          mainMenu();
        }
      } else {
        alert("Account number" + error_number);
        mainMenu();
      }
      break;

    // Choice 6 "Delete record"
    case 6:
      var account_number = Number(prompt("Enter account number for deletion: "));
      if (!Number.isNaN(account_number)) {
        if (checkNumberForSpecial(account_number)) {
          // Delete record from database
          dqueries.deleteRecord(account_number);
          mainMenu();
        } else {
          alert("Account number" + error_message);
          mainMenu();
        }
      } else {
        alert("Account number" + error_number);
        mainMenu();
      }
      break;

    // Choice 7 "Transfer funds"
    case 7:
      var account_number_send = Number(prompt("Enter account number to transfer funds: "));
      if (!Number.isNaN(account_number_send)) {
        if (checkNumberForSpecial(account_number_send)) {
          var account_number_receive = Number(prompt("Enter account number to receive funds: "));
          if (!Number.isNaN(account_number_receive)) {
            if (checkNumberForSpecial(account_number_receive)) {
              var transfer_amount = parseFloat(prompt("Enter amount to transfer: "));
              if (!isNaN(transfer_amount)) {
                if (checkNumberForSpecial(transfer_amount)) {
                  // Transfer funds in database
                  dqueries.transferFunds(account_number_send, account_number_receive, transfer_amount);
                  mainMenu();
                } else {
                  alert("Transfer amount" + error_message);
                  mainMenu();
                }
              } else {
                alert("Tranfer amount" + error_number);
                mainMenu();
              }
            } else {
              alert("Account number" + error_message);
              mainMenu();
            }
          } else {
            alert("Account number" + error_number);
            mainMenu();
          }
        } else {
          alert("Account number" + error_message);
          mainMenu();
        }
      } else {
        alert("Account number" + error_number);
        mainMenu();
      }
      break;

    // Choice 8 "Update user access level"
    case 8:
      var username = prompt("Enter username: ");
      if (checkForSpecial(username)) {
        var new_access_level = Number(prompt("Enter new access level(1-10): "));
        // Check if new access level is between 1 and 10
        if ((new_access_level <= 10) && (new_access_level >= 1) ) {
          // Update user access level in database
          dqueries.updateAccessLevel(username, new_access_level);
          mainMenu();
        } else {
          alert("Access level must be a number between 1 and 10.");
          mainMenu();
        }
      } else {
        alert("Username" + error_message);
        mainMenu();
      }
      break;
    
    // Choice 0 "Logout"
    case 0:
      alert("Loging out...");
      loginMenu();
      break;

    // Choice incorrect
    default:
      alert("Your choice is not one of the options.\n\n");
      mainMenu();
  }
}

// --- MAIN MENU LIMITED --- //

// Limited CRUD operations for the database
function mainMenuLimited() {
  // Main menu for access level 1 to 7
  let main_menu_limited = "___MAIN_MENU___\n1: Display all\n2: Add record\n3: Add records from a file\n4: Search for record\n5: Update amount\n6: Transfer funds\n0: Logout\n\n";
  var main_choice_limited = Number(prompt(main_menu_limited + "Enter a number: "));

  switch(main_choice_limited) {
    // Choice 1 "Display all"
    case 1:
      dqueries.displayAllRecords();
      mainMenuLimited();
      break;

    // Choice 2 "Add record"
    case 2:
      var customer_name = prompt("Enter customer name: ");
      if (checkForSpecial(customer_name)) {
        var account_number = Number(prompt("Enter new account number: "));
        if (!Number.isNaN(account_number)) {
          if (checkNumberForSpecial(account_number)) {            
            var account_balance = parseFloat(prompt("Enter opening balance: "));
            if (!isNaN(account_balance )) {
              if (checkNumberForSpecial(account_balance)) {
                // Add new record to database
                dqueries.addNewRecord(customer_name, account_number, account_balance);
                mainMenuLimited();
              } else {
                alert("Opening balance" + error_message);
                mainMenuLimited();
              }
            } else {
              alert("Opening balance" + error_number);
              mainMenuLimited();
            }
          } else {
            alert("Account number" + error_message);
            mainMenuLimited();
          }
        } else {
          alert("Account number" + error_number);
          mainMenuLimited();
        }
      } else {
        alert("Customer name" + error_message);
        mainMenuLimited();
      }
      break;

    // Choice 3 "Add records from a file"
    case 3:
      alert("Click \"OK\".\nThen click \"Choose File\" to select an Excel file to upload.");    
      // Triggered by file selection
      document.getElementById("records").onchange = (evt) => {
        var reader = new FileReader();

        // Event listener for file loaded
        reader.addEventListener("loadend", (evt) => {
          var workbook = XLSX.read(evt.target.result, {type: "binary"}),
            worksheet = workbook.Sheets[workbook.SheetNames[0]],
            range = XLSX.utils.decode_range(worksheet["!ref"]);

          // Place file contents into array with comma delimited
          var newRecordsFile = [];
          for (let row=range.s.r; row<=range.e.r; row++) {
            let i = newRecordsFile.length;
            newRecordsFile.push([]);
            for (let col=range.s.c; col<=range.e.c; col++) {
              let cell = worksheet[XLSX.utils.encode_cell({r:row, c:col})];
              newRecordsFile[i].push(cell.v);
            }
          }

          // File content security check
          if (checkFileSpecial(newRecordsFile)) {
            // Add records from file to database
            dqueries.addNewRecordsFile(newRecordsFile);
            mainMenuLimited();
          } else {
            alert(file_error);
            mainMenuLimited();
          }
        });
        // Read file contents and trigger "loadend"
        reader.readAsArrayBuffer(evt.target.files[0]);
      };
      break;

    // Choice 4 "Search for record"
    case 4:
      var account_number = Number(prompt("Enter account number: "));
      if (!Number.isNaN(account_number)) {
        if (checkNumberForSpecial(account_number)) {
          // Search database for record
          dqueries.searchDatabase(account_number);
          mainMenuLimited();
        } else {
          alert("Account number" + error_message);
          mainMenuLimited();
        }
      } else {
        alert("Account number" + error_number);
        mainMenuLimited();
      }
      break;

    // Choice 5 "Update account balance"
    case 5:
      var account_number = Number(prompt("Enter account number to update: "));
      if (!Number.isNaN(account_number)) {
        if (checkNumberForSpecial(account_number)) {
          var account_balance = parseFloat(prompt("Enter new balance: "));
          if (!isNaN(account_balance)) {
            if (checkNumberForSpecial(account_balance)) {
              // Update account balance in database
              dqueries.updateBalance(account_number, account_balance);
              mainMenuLimited();
            } else {
              alert("New balance" + error_message);
              mainMenuLimited();
            }
          } else {
            alert("New balance" + error_number);
            mainMenuLimited();
          }
        } else {
          alert("Account number" + error_message);
          mainMenuLimited();
        }
      } else {
        alert("Account number" + error_number);
        mainMenuLimited();
      }
      break;

    // Choice 6 "Transfer funds"
    case 6:
      var account_number_send = Number(prompt("Enter account number to transfer funds: "));
      if (!Number.isNaN(account_number_send)) {
        if (checkNumberForSpecial(account_number_send)) {
          var account_number_receive = Number(prompt("Enter account number to receive funds: "));
          if (!Number.isNaN(account_number_receive)) {
            if (checkNumberForSpecial(account_number_receive)) {
              var transfer_amount = parseFloat(prompt("Enter amount to transfer: "));
              if (!isNaN(transfer_amount)) {
                if (checkNumberForSpecial(transfer_amount)) {
                  // Transfer funds in database
                  dqueries.transferFunds(account_number_send, account_number_receive, transfer_amount);
                  mainMenuLimited();
                } else {
                  alert("Transfer amount" + error_message);
                  mainMenuLimited();
                }
              } else {
                alert("Transfer amount" + error_number);
                mainMenuLimited();
              }
            } else {
              alert("Account number" + error_message);
              mainMenuLimited();
            }
          } else {
            alert("Account number" + error_number);
            mainMenuLimited();
          }
        } else {
          alert("Account number" + error_message);
          mainMenuLimited();
        }
      } else {
        alert("Account number" + error_number);
        mainMenuLimited();
      }
      break;

    // Choice 0 "Logout"
    case 0:
      alert("Loging out...");
      loginMenu();
      break;

    // Choice incorrect
    default:
      alert("Your choice is not one of the options.\n\n");
      mainMenuLimited();
  }
}

loginMenu();

// Import MongoClient from MongoDB
import { MongoClient } from 'mongodb';

// The uri link to my created MongoDb database
const uri = 'mongodb+srv://Admin2:Admin2@cluster0.a3wnm.mongodb.net/loginapp?retryWrites=true&w=majority';

// Creates MongoClient instance directed at the database
const client = new MongoClient(uri);

// Simplify the database table operations for ease of use
const customerDB = client.db("loginapp").collection("customer");
const userDB = client.db("loginapp").collection("user");


// --- CRUD operations for 'user' table --- //

// Login user
export async function loginUser(username_passed, password_passed) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Search for username and password in database
        var result = await userDB.findOne({username: username_passed, password: password_passed});
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        alert("There was an error while logging in.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Login user access_level check
export async function loginAccessCheck(username_passed, password_passed) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Search for username and password in database
        var result = await userDB.findOne({username: username_passed, password: password_passed});
        
        // Checks if user access level >= 8
        if (result.access_level >= 8) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        alert("There was an error while checking access level.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Add user
export async function addUser(username_passed, password_passed) {
    try {
        // Connect to MongoClient
        await client.connect();
        
        // Insert new user into database
        await userDB.insertOne({username: username_passed, password: password_passed, access_level: 1});    
    } catch (e) {
        alert("There was an error while adding user to database.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Update user access level
export async function updateAccessLevel(username_passed, new_access_level) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Update access level in database
        await userDB.updateOne({username: username_passed}, {$set: {access_level: new_access_level}});
    } catch (e) {
        alert("There was an error while updating access level.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Change user password
export async function changePassword(username_passed, password_passed, new_password) {
    try {
        // Connect to MongoClient
        await client.connect();
    
        // Change password in database
        await userDB.updateOne({username: username_passed, password: password_passed}, {$set: {password: new_password}});
    } catch (e) {
        alert("There was an error while changing password.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// --- CRUD operation functions for 'customer' table --- //

// Display all customer records
export async function displayAllRecords() {
    try {
        // Connect to MongoClient
        await client.connect();
        
        // Find all records from customer table in database
        var cursor = await customerDB.find();  

        // Store records into an array
        const result = cursor.toArray();

        // If any records found then display all
        if (result.length > 0) {
            alert(result.forEach((result, i) => {
                (i + 1) + ". Customer name: " + result.customer_name + 
                "\n   Account number: " + result.account_number + 
                "\n   Account balance: " + result.account_balance + 
                "\n"
            }));
        } else {
            // If no records found
            alert("No records found...");
        }
    } catch (e) {
        alert("There was an error while accessing database.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Add new customer record
export async function addNewRecord(customer_name_passed, account_number_passed, account_balance_passed) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Insert new customer into database
        await customerDB.insertOne({customer_name: customer_name_passed, account_number: account_number_passed, account_balance: account_balance_passed});    
    } catch (e) {
        alert("There was an error while adding new customer record to database.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Add new customer records from file
export async function addNewRecordsFile(newRecordsFile) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Insert new customer records from file
        for (let i = 0; i < newRecordsFile.length; i++) {
            await customerDB.insertOne({customer_name: newRecordsFile[i][0], account_number: newRecordsFile[i][1], account_balance: newRecordsFile[i][2]});    
        }
    } catch (e) {
        alert("There was an error while adding records from file to database.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Search for customer record
export async function searchDatabase(account_number_passed) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Search for account number in database
        var result = await customerDB.find({account_number: account_number_passed});
        
        // If records found display all
        if (result.length > 0) {
            alert(result.forEach((result, i) => {
                (i + 1) + ". Customer name: " + result.customer_name + 
                "\n   Account number: " + result.account_number + 
                "\n   Account balance: " + result.account_balance + 
                "\n"
            }));
        } else {
            // If no records found
            alert("No records found...");
        }
    } catch (e) {
        alert("There was an error while searching database.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Update customer account balance
export async function updateBalance(account_number_passed, account_balance_passed) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Update customer account balance in database 
        await customerDB.updateOne({account_number: account_number_passed}, {$set: {account_balance: account_balance_passed}});
    } catch (e) {
        alert("There was an error while updating account balance.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Delete customer record
export async function deleteRecord(account_number_passed) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Delete customer records from database
        await customerDB.deleteOne({account_number: account_number_passed});
    } catch (e) {
        alert("There was an error while deleting record.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

// Transfer customer account funds
export async function transferFunds(account_number_send, account_number_receive, transfer_amount) {
    try {
        // Connect to MongoClient
        await client.connect();

        // Search for account numbers in database
        var result_send = await customerDB.findOne({account_number: account_number_send});
        var result_receive = await customerDB.findOne({account_number: account_number_receive});

        // Calculate fund transfer
        var account_balance_minus = parseFloat(parseFloat(result_send.account_balance - transfer_amount).toFixed(2));
        var account_balance_add = parseFloat(parseFloat(result_receive.account_balance + transfer_amount).toFixed(2));

        // Transfer funds between accounts in database
        await customerDB.updateOne({account_number: account_number_send}, {$set: {account_balance: account_balance_minus}});
        await customerDB.updateOne({account_number: account_number_receive}, {$set: {account_balance: account_balance_add}});
    } catch (e) {
        alert("There was an error while transfering funds.\n" + e);
    } finally {
        // Close connection to MongoClient
        await client.close();
    }
}

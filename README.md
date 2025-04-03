# Z-Prefix CRUD Application Submission
This is my submission for the CRUD application portion of the z-prefix assessment. Below you will find instructions on how to spin up the application.

## Setting up the database
1. Ensure that you have a docker container with a postgres database. The command string that was utilized in the development of this app is as follows:

```
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=(INPUT YOUR OWN PASSWORD) -d -p 5432:5432 \ -v $HOME/docker/volumes/postgres : /ver/lib/postgresql/data postgres
```

**NOTE** the "INPUT YOUR OWN PASSWORD" does NOT indicate that is the password, ensure you configure your docker with a password you will remember.

2. You will now need to run:

```
docker ps -a
```

To grab the container ID you just created so that you can access your postgreSQL image you also just set up and create a database.

3. You are able to utilize any name you see fit. You will need to remember the database for your .env file later.

## Setting up the server
1. To have the server connect with the database, a .env file was utilized. Ensure that you create a .env file within the server directory:

```
touch .env
```
2. Within the .env file you will need to create your environment variables. Below is an example, but you will need to input the proper variable assignments indicated to the right of the equals sign.

```
DB_PASSWORD=**Input your database passwor**
DB_USER=**Input your database username**
DB_PORT=**Input the port your database is communicating on**
DB_NAME=**Input the name of the database you chose**
PG_DB_HOST=**Input the URL your computer is communicating on, it is typically localhost**
```

3. As long as your .env file is set up properly, the knexfile.js should be configured properly as well.

## How to use the app

1. When you spin up the app, you will be directed to the Sign-up page. Enter your **First Name**, **Last Name** and choose a **Username** and **Password** and click the **Sign Up** button.

      -- Clicking the **Sign Up** button creates your account and saves your user information in the database

      -- If you do not wish to sign up, but want to see all of the inventory items, simply click the **Guest** button and you will be taken to a table with all of the items entered by all inventory managers.

2. Next, click the **Login** button. Your **Username** and **Password** will remain filled in from sign up when you click the **Login** button, which will automatically take you to your profile page.

      -- Users who have already signed up for the app will need to input their **Username** and **Password** in order to sign in.

3. Once you are logged in, you will see your profile. It will have a **Logout** button at the top, it will welcome you with your first and last name, there will be an **Add New Item** button, a **Get "Your first name" Inventory** button, and a **Get All Inventory** button.

4. To view inventory that is associated with you as the user, simply click the **Get "Your first name" Inventory** button. If you have inventory, it will show up in an editable table. If you do not have inventory, it will say "No inventory found for 'Your first name last name'".

5. If you do not have any inventory or would like to add new items to your inventory, click the **Add New Item** button.

      -- This will give you a prompt to enter the item name. Enter the name of the item you wish then hit OK

      -- Next, you will enter the description you want, then hit OK

      -- Lastly, you enter the quantity, hit OK, and you will be presented with an alert that say "Item added successfully", click OK again.

      -- **NOTE:** to view your items, you may need to refresh the table by clicking the **Get "Your first name" Inventory** button twice, this toggles the table closed and then open again, which will retrieve the data from the database.

6. You should now see the item added to your inventory in a table with the item's ID, Item Name, Quantity, Description, and a **Delete** button.

      -- If you made a mistake and wish to edit any item field, simply **single-click** on the field you wish to edit. For example, if you input the wrong quantity simply **single-click** the number in the quantity column which will then allow you to make a change. The only field that is not editable is the item's ID field as that is hardset by the database.

      -- Once your change is made, either hit enter or click off of the field to save the changes.

      -- If you no longer wish to have the item in your inventory, simply click the **Delete** button.

      -- **NOTE:** You may need to refresh your inventory table to see any changes by toggling the table closed and then open it again.

7.  To view all of the items that inventory managers have input into the database, simply click the **Get All Inventory** button. This will bring up all inventory items in an uneditable table. You can even see your items you just added in that table as well.

      -- **NOTE:** You may need to refresh the inventory table to see any changes that you made in your inventory by toggling the table closed and then open it again.

8.  You may have noticed that for long descriptions, you do not see the whole string of text. If you want to see all of the details of any item, simply **double-click** the row in the **user inventory** table or **single-click** in the **all inventory** table and you will be directed to a details page where you can review all of the item's details.

9.  Lastly, have fun managing your inventory! This app will surely make your life a whole lot easier!


## Author

Curtis Bonham
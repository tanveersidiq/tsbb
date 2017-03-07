# tsbb
Bulletin &amp; Board for Crossover.
### Set Environment Variables Windows: ###
* SET PORT={port for web and api should listen to}
* SET DATABASE_SERVER={database server}
* SET DATABASE_USER={user to connect to database}
* SET DATABASE_PASSWORD={passsword to connect to database}
* SET DATABASE={database name to connect to}
* SET SECURE_DATABASE_CONNECTION={is connection secure 'true/false'}
* SET JWT_SECRET={secret to generate authentication token}
### Set Environment Variables Centos: ###
* PORT={port for web and api should listen to}
* DATABASE_SERVER={database server}
* DATABASE_USER={user to connect to database}
* DATABASE_PASSWORD={passsword to connect to database}
* DATABASE={database name to connect to}
* SECURE_DATABASE_CONNECTION={is connection secure 'true/false'}
* JWT_SECRET={secret to generate authentication token}

### Allow MySQL to connect from using IP: ###
* create user 'root'@'10.0.2.2' identified by 'yourpassword';
* grant all privileges on *.* to 'root'@'10.0.2.2' with grant option;
* flush privileges;
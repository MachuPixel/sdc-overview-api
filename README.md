# sdc-overview-api

## Create and seed the database:

Running these command in the terminal
```
npm run configure
```

Running the following in psql command line:
```
psql -U node_user overview < ./server/database/seeder.sql
```

Then you can using following command to check the new database and the tables
```
psql overview -U node_user
```

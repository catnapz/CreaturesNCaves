# Database 
This directory has scripts to setup database locally.

### Environment Setup
`Required` [Install PostgreSQL](https://www.postgresql.org/download/) (Recommended v12)

`Optional` [pgAdmin4](https://www.pgadmin.org/download/) or other database management software

### Setup psql
Do either of the following:
* Use pgAdmin4
* Read the [docs](https://www.postgresql.org/docs/current/tutorial.html)
* Follow [these tutorials](https://www.postgresqltutorial.com/install-postgresql/)
* Google

### Setup database
You may run the scripts highlighted in the instructions below in pgAdmin or any other method of your choice. The instructions will use the psql console.
1. Once psql is setup, log into psql console as the postgres user. ``` psql -h 127.0.0.1 -U postgres ```

2. Then, in the psql console, run [00_create_cnc_admin.pgsql](Scripts/00_create_cnc_admin.pgsql) from the [Scripts](Scripts/) directory.
> **Change the password field in the script to a password of your choice** \
> Scripts are run one SQL statement at a time (ends with `;`) Make sure you hit enter to run the scripts

3. Then, in the psql console, 
    1. run [01_database_create.pgsql](Scripts/01_database_create.pgsql) from the [Scripts](Scripts/) directory.
    2. run [02_public_schema_create.pgsql](Scripts/02_public_schema_create.pgsql) from the [Scripts](Scripts/) directory.

4. Run `\c cnc cnc_admin` to connect to the cnc database as the cnc_admin user
> If not already in the psql console, run `psql -h 127.0.0.1 -U cnc_admin cnc` to connect to the cnc database as the cnc_admin user 

5. Run the rest of the [scripts](Scripts/) after connecting to `cnc` as `cnc_admin` (script 03 to 12)

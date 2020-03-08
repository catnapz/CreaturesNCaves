# Database 
This directory has scripts to setup database locally and populate with dummy data. 

### Environment Setup
`Required` [Install PostgreSQL](https://www.postgresql.org/download/) (Recommended v12)

`Optional` [pgAdmin4](https://www.pgadmin.org/download/) or other database management software

### Setup psql
Do either of the following:
* Use pgAdmin4 (easiest)
* Read the [docs](https://www.postgresql.org/docs/current/tutorial.html)
* Follow [these tutorials](https://www.postgresqltutorial.com/install-postgresql/)

### Setup database
* Once psql is setup, log into psql as the postgres user. ``` psql -h 127.0.0.1 -U postgres ```

* Then run the SQL scripts under the Scripts directory in order (filename prefix 0_ is before 1_)

* Run the `generate.sh` bash script under DummyData directory.
  * Usage: ```generate.sh [(optional) # of users to generate] [(optional) # of campaigns per users to generate]  ```
  * If no arguments are passed to the script, 10 is used for both.

* Import the generated csv files into the database
  * Using pgAdmin, right click on the table and select `Import/Export`
  * Using cli, make an SQL call using the template below in the cnc database as the cnc_admin user:
  * ```COPY public.campaigns (campaign_id, user_id, name, description) FROM 'path/to/generated.csv' CSV QUOTE '\"' ESCAPE ''''; ```

### NOTE: 
`psql -h 127.0.0.1 -U cnc_admin cnc`
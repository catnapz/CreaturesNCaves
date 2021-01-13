sudo -u postgres psql postgres -f 00_create_cnc_admin.pgsql
sudo -u postgres psql postgres -f 01_database_create.pgsql
psql -h 127.0.0.1 -U cnc_admin cnc -f 03_users_table.pgsql
psql -h 127.0.0.1 -U cnc_admin cnc -f 04_campaigns_table.pgsql
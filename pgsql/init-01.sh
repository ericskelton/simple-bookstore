#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;

psql -U postgres <<- EOSQL
    CREATE USER IF NOT EXISTS $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
    CREATE DATABASE IF NOT EXISTS $POSTGRES_DB;
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
    \connect $POSTGRES_DB -U $POSTGRES_USER
    BEGIN;
        Create Table IF NOT EXISTS "user" (
            id serial PRIMARY KEY,
            username varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            admin boolean NOT NULL DEFAULT false,
            token varchar(255),
        );
        
    COMMIT;  
EOSQL

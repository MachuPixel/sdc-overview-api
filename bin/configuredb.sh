#!/bin/bash

database="overview"

echo "Configuring database: $database"

dropdb -U node_user overview
createdb -U node_user overview

psql -U node_user overview < ./server/database/schema.sql


echo "$database configured"
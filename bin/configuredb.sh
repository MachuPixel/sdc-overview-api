# #!/bin/bash

# database="overview"

# echo "Configuring database: $database"

# dropdb -U node_user overview
# createdb -U node_user overview

# psql -U node_user overview < ./server/database/schema.sql


# echo "$database configured"


#!/bin/bash

database="overview"

echo "Configuring database: $database"

# Connect to the Dockerized PostgreSQL container and execute the commands
docker exec -it postgresql dropdb -U node_user $database
docker exec -it postgresql createdb -U node_user $database
docker exec -it postgresql psql -U node_user $database < ./server/database/schema.sql

echo "$database configured"

Step to set up

1. Run postgres v15 on docker

```sh
docker run --name school_mgmt_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=school_mgmt \
  -p 5432:5432 \
  -d postgres:15
```

```sh
cd seed_db
docker cp tables.sql school_mgmt_db:/tables.sql                              
docker cp seed-db.sql school_mgmt_db:/seed-db.sql
```

```sh
docker exec -it school_mgmt_db psql -U postgres -d school_mgmt -f /tables.sql
docker exec -it school_mgmt_db psql -U postgres -d school_mgmt -f /seed-db.sql
```
2. check and verify the migration of data

```sh
docker exec -it school_mgmt_db psql -U postgres -d school_mgmt -c "SELECT COUNT(*) FROM users;"
```
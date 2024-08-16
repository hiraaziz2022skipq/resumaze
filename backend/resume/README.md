// create migration
https://mdhvkothari.medium.com/how-to-do-the-migration-in-fastapi-5c53d3880f12
https://www.youtube.com/watch?v=zTSmvUVbk8M&t=54s

in /alembic/env.py change target

- alembic revision --autogenerate -m "initial migrations"

if there is error of no sqlmodel then replace with this in migration file sa.String()
then run alembic upgrade head

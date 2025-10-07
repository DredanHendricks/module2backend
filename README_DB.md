Postgres configuration for this project

You can connect using a single DATABASE_URL or individual environment variables.

Option A (preferred for hosts like Heroku, Railway):

DATABASE_URL=postgres://user:password@host:5432/database

Option B (local development):

PGHOST=localhost
PGPORT=5432
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=your_db_name

Notes:
- If NODE_ENV=production, the code will enable SSL with rejectUnauthorized: false which is commonly required by hosted Postgres providers.
- If you want me to create a `.env` file in the repo with placeholders, tell me and I'll add it.

Render-specific notes:

- In the Render dashboard for your service, go to "Environment" → "Environment Variables" and add a variable named `DATABASE_URL` with the value Render provides for your Postgres instance, or build a URL like:

	postgres://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>

- Make sure your Render web service has the `NODE_ENV` set to `production` (or keep it empty) so the code will enable SSL automatically. If you prefer to explicitly force SSL, set `DATABASE_SSL=true` and I can update the code to check that variable.

- If your Render Postgres provider gives a CA certificate and you want strict verification, we can load the CA and pass it into the pool SSL options instead of using `rejectUnauthorized: false`.

Example DATABASE_URL (do NOT commit credentials to git):

DATABASE_URL=postgres://myuser:mypassword@ec2-12-34-56-78.compute-1.amazonaws.com:5432/mydb

If you'd like, I can create a `.env.example` file with placeholders for local development and add a short note in `README.md` on how to set the Render secret.

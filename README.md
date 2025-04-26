# Build and run
## Environment
Create a `.env` file with the following content and fill in the values.
```dotenv
PORT=7000
NODE_ENV=production

PANDASCORE_TOKEN=<token>
```
## Manually
```shell
npm install
npm run build && npm run start
```
## Docker
Don't forget to edit the run command to adapt to your port (the first port is the one exposed by the container, the second is the one used by the app).
```shell
docker build -t pam-hapi .
docker run -d -e .env --name pam-hapi -p 7001:7000 pam-hapi
```

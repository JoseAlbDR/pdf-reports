# REPORT SERVER

## GETTING STARTED

1. Install dependencies

```bash
npm ci
```

2. Copy .env.template to .env and edit it to your liking

```bash
cp .env.template .env
```

3. Run postgres and pgAdmin locally

```bash
docker-compose up -d
```

4. Run TypeORM migrations

```bash
npm run migration:run
```

5. Run server locally

```bash
npm run start:dev
```

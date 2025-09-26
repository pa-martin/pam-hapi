npm ci
npm run build --if-present
npm run lint --if-present
npm test --if-present
# Liste des packages overrides et les packages les utilisant
# [deprecated] glob < v9 | swagger-jsdo (glob@7.1.6) & tsup (glob@10.4.5)
# [deprecated] @apidevtools/swagger-parser < 10.1.0 | swagger-jsdoc (swagger-parser@10.0.3)
npx npm-check-updates
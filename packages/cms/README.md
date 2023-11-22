# @kids-reporter/cms

## Preface
此Repo
- 使用[KeystoneJS 6](https://keystonejs.com/docs)來產生CMS服務。
- 串接 Cloud Build 產生 Docker image 和部署到 Cloud Run 上。

cloud builds:
- [dev-cms](https://console.cloud.google.com/cloud-build/triggers;region=asia-east1/edit/05145244-79e4-4fd7-aa15-8194c42f970d?project=kids-reporter)
- [staging-cms](https://console.cloud.google.com/cloud-build/triggers;region=asia-east1/edit/360f6643-87ba-43c2-9ec6-a9b4c1203fd1?project=kids-reporter)
- [prod-cms](https://console.cloud.google.com/cloud-build/triggers;region=asia-east1/edit/48228550-f19c-41b1-83f9-abee00765804?project=kids-reporter)

cloud runs:
- [dev-cms](https://console.cloud.google.com/run/detail/asia-east1/dev-cms?project=kids-reporter)
- [staging-cms](https://console.cloud.google.com/run/detail/asia-east1/staging-cms?project=kids-reporter)
- [prod-cms](https://console.cloud.google.com/run/detail/asia-east1/prod-cms?project=kids-reporter)

## Environment Variables
相關環境變數可以參考 [`environment-variables.ts`](https://github.com/kids-reporter/kids-reporter-monorepo/blob/dev/packages/cms/environment-variables.ts) 檔案。

其中值得注意的是，`NODE_ENV` 除了 convention 的 `development` 和 `production` 之外，亦有 `test`的選項。當 `NODE_ENV=test` 時，Keystone server 會關閉 Role-based Authentication，不再檢查 request 是否可以 Query/Create/Update/Delete Keystone 的資源。

若你想要在 local 端開發 frontend，而 frontend 需要 GQL server 來測試，那你可以嘗試 `NODE_ENV=test yarn dev` 來起 server。

## Getting started on local environment
### Start postgres instance
在起 CMS 服務前，需要在 local 端先起 postgres database。
而我們可以透過 [Docker](https://docs.docker.com/) 快速起 postgres database。
在電腦上安裝 Docker 的方式，可以參考 [Docker 安裝文件](https://docs.docker.com/engine/install/)。
安裝 Docker 後，可以執行以下 command 來產生 local 端需要的 postgres 服務。
```
docker run -p 5432:5432 --name kids-cms -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=kids -d postgres
```

註：
`POSTGRES_PASSWORD`, `POSTGRES_USER` 和 `POSTGRES_DB` 都可更動。
只是要注意，改了後，在起 CMS 的服務時，也要更改傳入的 `DATABASE_URL` 環境變數。

### Install dependencies
我們透過 yarn 來安裝相關套件。
```
yarn install
```

### Start dev instance
確定 postgres 服務起來和相關套件安裝完畢後，可以執行以下 command 來起 CMS 服務
```
yarn dev
// or
npm run dev
```

如果你的 database 的設定與上述不同，
可以透過 `DATABASE_URL` 環境變數傳入。
```
DATABASE_URL=postgres://anotherAccount:anotherPasswd@localhost:5433/anotherDatabase yarn dev
// or
DATABASE_URL=postgres://anotherAccount:anotherPasswd@localhost:5433/anotherDatabase npm run dev
```

成功將服務起來後，使用瀏覽器打開 [http://localhost:3000](http://localhost:3000)，便可以開始使用 CMS 服務。

### GraphQL playground
起 CMS 服務後，我們可以透過 [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) 來使用 GraphQL playground。

### Database Migration （建議同步參考 [Keystone 文件](https://keystonejs.com/docs/guides/database-migration#title)）
Keystone 底層是透過 [Prisma](https://github.com/prisma/prisma)來管理資料庫（Postgres）。
當我們更動 Keystone List，例如：`lists/post.ts`，Keystone 會根據改動調整 `schema.grahpql` 和 `schema.prisma` 兩個檔案。
`schema.graphql` 會影響 GraphQL API 的 schema，而 `schema.prisma` 則會影響與資料庫的串接。

在 `migrations/` 資料夾底下，存放所有 migration 的歷史紀錄。
在部署 CMS 服務到 Cloud Run 上時，Keystone 會逐一執行 `migrations/` 底下的檔案，確保資料庫現有的 schema 與要部署的程式碼相符。
因此，當 `schema.prisma` 檔案有所更動時，我們就需要執行 database migration，並將改動的內容寫進 `migrations/` 資料夾底下。

#### 1. 產生新的 `schema.prisma` 和 database schema
上述有說到，當有新的 `schema.prisma` 時，要產生新的 migration 檔案。
但是，我們要怎麼根據修改的 list 去產生新的 `schema.prisma` 呢？
我們需要在 local 端跑 `yarn dev` 。
`yarn dev` 會預設會執行 auto migration，所以會將新的 list 所產生的 schema 直接覆蓋 database 的 schema，
也會修改 `schema.prisma`。

#### 2. 產生 migration 檔案
當 database 的 schema 有所改動，其 databsase schema 就會與 `migrations/` 底下的檔案產生差異，
我們會需要為這些差異產生新的 migration 檔案。
以下是推薦的做法：
```
// docker stop database instance if needed 
docker stop kids-cms;

// docker run a new database for migration
// the reason we add new instance is because prisma migration will clean up all data before generating migration files
docker run -p 5432:5432 --name kids-cms-migration -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=kids -d postgres;

// Auto migrate new list schemas
yarn dev; // You can enter CTRL+c to stop Keystone server after auto migration done

// Generate new migration file for schema changes
yarn keystone prisma migrate dev --name 'update_post_list' // 'update_post_list' will be part of the file name
```

#### 3. 上傳 migration 檔案和新的 schema.prisma 到 repo
Database migration 執行的時機點是在部署的時候，
因此，新產生的 `shema.prisma` 和 `migrations/update_post_list` 檔案都需要進到 GitHub Repo 當中。
如果忘記上傳，則可能會遇到 Keystone server 跑不起來的狀況。

### Troubleshootings
#### Q1: 我在 `packages/cms` 資料夾底下跑 `yarn install` 時，在 `yarn postinstall` 階段發生錯誤。

A1: 如果錯誤訊息與 `@kids-reporter/(draft-editor|draft-renderer|cms-core|)` 有關，可以嘗試先到 `packages/(draft-editor|draft-renderer|core)` 底下，執行 `yarn build`。

確保 local 端有相關的檔案可以讓 `packages/cms` 載入。

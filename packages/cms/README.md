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


### Troubleshootings
#### Q1: 我在 `packages/cms` 資料夾底下跑 `yarn install` 時，在 `yarn postinstall` 階段發生錯誤。

A1: 如果錯誤訊息與 `@kids-reporter/(draft-editor|draft-renderer|cms-core|)` 有關，可以嘗試先到 `packages/(draft-editor|draft-renderer|core)` 底下，執行 `yarn build`。

確保 local 端有相關的檔案可以讓 `packages/cms` 載入。

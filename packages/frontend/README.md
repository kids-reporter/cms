This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables
NextJS 將環境變數分成 public 和 non-public。
public 的環境變數在命名上需要加上 `NEXT_PUBLIC_` 前綴，而 `NEXT_PUBLIC_` 開頭的環境變數在 build time（也就跑 `next build`）時會被 NextJS build 進 bundles 裡。
non-public 的環境變數則只能使用在 server side，不會被 NextJS build 進 bundles。

因為我們在不同的環境(dev, staging 和 prod)下，會需要不同的 public 環境變數，
而這些環境變數需要在 build time 時提供（也就是 Cloud Build 在跑 build 的時候使用）。
我們的做法是將不同的環境變數定義在不同的檔案之中，
檔案分別是 `.env.dev.public`、 `.env.staging.public` 和 `.env.prod.public`。
後綴 `.public` 是要提醒這個檔案只能放 public 的環境變數。
這些不同的檔案，在 Cloud Build 執行時，會根據當時跑的 Git branch 來決定要使用哪個環境變數檔案。
例如：dev branch 執行時會使用 `.env.dev.public` 檔案。
詳細執行方式可以參考 [PR #207](https://github.com/kids-reporter/kids-reporter-monorepo/pull/207) 。
因為我們會將 `.env.dev.public` 複製成 `.env.local` 檔案，而 `.env.local` 檔案會被放進 docker image 中，
當 Cloud Run 執行 docker container（起 NextJS server 時），NextJS 也會讀取 `.env.local` 中的環境變數；
因此，我們可以確保 run time 和 build time 所使用的環境變數是一致的。

而 non-public 的環境變數，都是 run time（跑 `next start`） 時使用，所以我們可以直接定義在 Cloud Run 的 Environment Variables 上。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

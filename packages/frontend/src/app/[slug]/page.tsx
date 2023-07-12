/*
// TODO: fetch data from api

const apiURL = 'https://api.example.com/...'

async function fetchArticle() {
  const res = await fetch(apiURL)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
*/

// TODO(Draft):
// 1. import draft from draft-renderer
// 2. prepare mockup for display

export default async function Article({
  params,
}: {
  params: { slug: string }
}) {
  // TODO: fetch data from graphQL of keystone
  // const data = await fetchArticle()
  return <h1>Article slug: {params.slug}</h1>
}

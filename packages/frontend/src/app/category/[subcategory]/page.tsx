export default function SubCategory({
  params,
}: {
  params: { subcategory: string }
}) {
  return <h1>subcategory: {params.subcategory}</h1>
}

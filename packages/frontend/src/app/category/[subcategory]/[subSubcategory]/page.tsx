export default function SubSubCategory({
  params,
}: {
  params: { subSubcategory: string }
}) {
  return <h1>subSubcategory: {params.subSubcategory}</h1>
}

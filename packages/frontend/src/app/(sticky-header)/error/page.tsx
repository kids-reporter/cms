export default async function Error() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src="./assets/images/500_error.png"
        alt="500 Internal Server Error"
      />
      <span className="text-3xl">伺服器遭遇困難⋯⋯</span>
      <span>請稍後或重新整理頁面。</span>
    </div>
  )
}

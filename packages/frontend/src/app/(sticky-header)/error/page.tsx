export default async function Error() {
  return (
    <div
      style={{ width: '95vw' }}
      className="flex flex-col justify-center items-center mb-16"
    >
      <img
        className="max-w-72 md:max-w-md lg:max-w-xl w-full mt-20 mb-16"
        src="./assets/images/500_error.png"
        alt="500 Internal Server Error"
      />
      <div className="flex flex-col justify-center items-center gap-2.5">
        <h1 className="text-3xl md:text-4xl font-bold">伺服器遭遇困難⋯⋯</h1>
        <span
          style={{
            fontFamily: 'var(--fontFamily)',
            color: 'var(--paletteColor3)',
          }}
          className="text-base font-medium"
        >
          請稍後或重新整理頁面。
        </span>
      </div>
    </div>
  )
}

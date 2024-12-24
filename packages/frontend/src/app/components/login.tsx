const LoginBtn = (component: React.ReactNode) => {
  return (
    <div className="flex flex-row items-center justify-center rounded-full border p-3 bg-white hover:bg-gray-100 hover:cursor-pointer gap-1">
      {component}
    </div>
  )
}

export const LoginBtns = () => {
  return (
    <div className="flex flex-col gap-4">
      {LoginBtn(
        <>
          <img alt="google" src="/assets/images/google.svg" />
          {'使用Google帳號'}
        </>
      )}
      {LoginBtn(
        <>
          <img
            alt="facebook"
            style={{ backgroundColor: 'rgb(66, 103, 178)' }}
            src="/assets/images/facebook.svg"
          />
          {'使用Facebook帳號'}
        </>
      )}
      {LoginBtn(
        <>
          <img alt="facebook" src="/assets/images/letter.svg" />
          {'使用電子信箱'}
        </>
      )}
    </div>
  )
}

export default LoginBtns

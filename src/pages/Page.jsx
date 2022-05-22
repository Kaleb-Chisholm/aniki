import { Navbar } from '../containers/Navbar'

export function Page({children}) {
  return (
    <>
      <Navbar/>
      {children}
  </>
  )
}

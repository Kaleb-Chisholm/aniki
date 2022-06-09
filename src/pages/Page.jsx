/** 
 * FILE: AnimeCard.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/09/2022
 * 
 * PURPOSE: Function component the page which contains all sub-components
 *          and the sidebar for navigation.
 * 
 * PROPS:
 *   { children } - Any children function components.
*/

// ------------------------------- IMPORTS ------------------------------------
import { Sidebar } from '../components/Sidebar'

// ------------------------------ FUNCTION ------------------------------------
export function Page({children}) {
  return (
      <Sidebar>{children}</Sidebar>
  )
}

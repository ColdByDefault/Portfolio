
/**
 * Custom React hook to determine if the current viewport width is considered "mobile".
 *
 * @ returns {boolean} - A boolean value indicating whether the viewport width is less than the mobile breakpoint.
 *
 * @ remarks
 * - The mobile breakpoint is defined as 768 pixels.
 * - The hook listens for changes in the viewport width and updates the state accordingly.
 *
 * @example
 * ```tsx
 * import { useIsMobile } from "./hooks/use-mobile";
 *
 * const MyComponent = () => {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <div>
 *       {isMobile ? "You are on a mobile device" : "You are on a larger screen"}
 *     </div>
 *   );
 * };
 * ```
 */
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)



  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

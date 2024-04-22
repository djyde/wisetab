import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~utils/queryclient";
import '../style.css'
import { useEffect } from "react";
import { themeChange } from "theme-change";

export function Providers(props: {
  children: React.ReactNode
}) {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}      
    </QueryClientProvider>
  )
}
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~utils/queryclient";
import '../style.css'

export function Providers(props: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}      
    </QueryClientProvider>
  )
}
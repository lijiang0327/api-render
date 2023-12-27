'use client'

import {useState, FC, ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

type ReactQueryProviderProps = {
    children: ReactNode
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({children}) => {
    const [queryClient] = useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000
                }
            }
        })
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider;

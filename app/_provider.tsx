'use client'

import {useMemo, FC, ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type ReactQueryProviderProps = {
    children: ReactNode
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({children}) => {
    const queryClient = useMemo(() =>  {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000
                }
            }
        })
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider;

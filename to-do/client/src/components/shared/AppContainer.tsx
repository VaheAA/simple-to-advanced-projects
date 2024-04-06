import { ReactNode } from 'react';

interface AppContainerProps {
  children: ReactNode
}
export default function AppContainer({children}: AppContainerProps) {
  return <div className="max-w-[1400px] w-full mx-auto px-3">
    {children}
  </div>
}
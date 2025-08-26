import React from 'react'
import dynamic from "next/dynamic"
import WenotiFyLoader from '@/components/shared/loader'

const DashboardView = dynamic(() => import("@/features/dashboard"), {
  ssr: true,
  loading:() => <WenotiFyLoader />
})

const Home = () => {
  return (
    <DashboardView/>
  )
}

export default Home

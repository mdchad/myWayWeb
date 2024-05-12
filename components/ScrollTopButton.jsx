'use client'

import React, { useEffect, useState } from 'react'
import {Button} from "@/components/ui/button";
import {ArrowBigUp} from "lucide-react";

const ScrollTopButton = () => {
  const [ showGoTop, setShowGoTop ] = useState( false )

  const handleVisibleButton = () => {
    setShowGoTop( window.scrollY > 50 )
  }

  const handleScrollUp = () => {
    window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
  }

  useEffect( () => {
    window.addEventListener( 'scroll', handleVisibleButton )
  }, [] )

  return (
    <div className={showGoTop ? 'fixed bottom-4 right-0 px-4' : ''}>
      <Button className="bg-royal-blue"  onClick={ handleScrollUp }>
        <ArrowBigUp size={24} color={'white'}/>
      </Button>
    </div>
  )
}

export default ScrollTopButton
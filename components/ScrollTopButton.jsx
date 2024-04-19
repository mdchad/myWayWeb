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
    <div className={showGoTop ? 'sticky bottom-4 grid justify-end px-4' : ''} onClick={ handleScrollUp }>
      <Button className="bg-royal-blue">
        <ArrowBigUp size={24} color={'white'}/>
      </Button>
    </div>
  )
}

export default ScrollTopButton
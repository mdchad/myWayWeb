'use client'

import React, { useEffect, useState } from 'react'
import {Button} from "@/components/ui/button";
import {ArrowBigDown, ArrowBigDownDash, ArrowBigUp, ArrowBigUpDash} from "lucide-react";

const ScrollTopButton = ({ divRef, setCurrentId, currentId, hadiths }) => {
  const [ showGoTop, setShowGoTop ] = useState( false )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentId({ id: parseInt(entry.target.id, 10), number: hadiths[entry.target.id - 1].number });
          }
        });
      },
      {
        root: null, // Use the viewport
        rootMargin: '-50% 0px -20% 0px', // Adjust to ensure larger elements are detected earlier
        threshold: 0, // Trigger when 75% of the element is visible
      }
    );

    Object.values(divRef.current).forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      Object.values(divRef.current).forEach((ref) => {
        if (ref instanceof Element) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const handleVisibleButton = () => {
    setShowGoTop( window.scrollY > 50 )
  }

  const handleScrollUp = () => {
    window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
  }

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });  }

  useEffect( () => {
    window.addEventListener( 'scroll', handleVisibleButton )
  }, [] )

  const scrollToElement = (id) => {
    const element = divRef.current[id];

    if (divRef.current[id]) {
      if (element) {
        const viewportHeight = window.innerHeight;
        const elementHeight = element.offsetHeight;
        const blockPosition = elementHeight > viewportHeight ? 'start' : 'end';

        element.scrollIntoView({ behavior: 'instant', block: blockPosition });
      }
    }
  };

  const handleNext = () => {
    if (currentId.id < hadiths.length) {
      setCurrentId((prevId) => ({ id: prevId.id + 1, number: hadiths[prevId.id - 1].number }))
      scrollToElement(currentId.id + 1);
    }
  };

  const handlePrev = () => {
    if (currentId.id > 1) {
      setCurrentId((prevId) => ({ id: prevId.id - 1, number: hadiths[prevId.id - 1].number }))
      scrollToElement(currentId.id - 1);
    }
  };

  return (
    <div className={showGoTop ? 'flex items-center gap-2 fixed bottom-4 left-1/2 transform -translate-x-1/2 p-2 bg-royal-blue rounded-xl' : ''}>
      <p className="whitespace-nowrap pl-2 text-white text-sm">{currentId.number} of {hadiths[hadiths.length -1].number}</p>
      <Button variant="ghost" size="small" onClick={handlePrev}>
        <ArrowBigUp size={24} color={'white'}/>
      </Button>
      <Button variant="ghost" size="small" onClick={handleNext}>
        <ArrowBigDown size={24} color={'white'}/>
      </Button>
      <Button variant="ghost" size="small" onClick={handleScrollUp}>
        <ArrowBigUpDash size={24} color={'white'} />
      </Button>
      <Button variant="ghost" size="small" onClick={handleScrollDown}>
        <ArrowBigDownDash size={24} color={'white'} />
      </Button>
    </div>
  )
}

export default ScrollTopButton
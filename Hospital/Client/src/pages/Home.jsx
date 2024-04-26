import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import Messageform from '../components/Messageform';
import Footer from '../components/Footer';
const Home = () => {
  return (
   <>
   <Hero title={"Welcome To Rk Hospital"} imageUrl={"/hero.png"}/>
   <Biography imageUrl={'/about.png'}/>
   <Departments/>
   <Messageform/>
   <Footer/>
   </>
  )
}

export default Home;
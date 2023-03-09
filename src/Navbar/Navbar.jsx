import React, {useState} from 'react'
import './Navbar.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'
import {BiBarcodeReader} from 'react-icons/bi'
import aartilogo from './aartilogo.png'


const Navbar = () => {

  const [active, setActive]  = useState('navBar')
  const showNav = ()=>{
      setActive('navBar activeNavbar')
  }
  const removeNav = ()=>{
      setActive('navBar')
  }
  return (
    <section className='navBarSection'>
       <header className="header flex">
        
          <div className="logoDiv">
            <a  className="logo flex"><img src={aartilogo}/>&nbsp; &nbsp;<h1>  Ürün Sorgulama App. <BiBarcodeReader/></h1></a>
          </div>

          <div className={active}>
            <ul onClick={removeNav} className="navLists flex">
              <li className="navItem">
                <a href="#" className="navLink">Ana Sayfa</a>
              </li>
              <li className="navItem">
                <a href="#" className="navLink">Sorgula</a>
              </li>
              <li className="navItem">
                <a href="#" className="navLink">Hakkımızda</a>
              </li>
              <li className="navItem">
                <a href="#" className="navLink">İletişim</a>
              </li>
             
              <button className="btn">
                <a href="#">Giriş/Çıkış</a>
              </button>

            </ul>
              <div onClick={removeNav} className="closeNavbar">
              <AiFillCloseCircle className='icon'/>
              </div>
          </div>

          <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className='icon'/>
          </div>
       </header>
    </section>
  )
}

export default Navbar
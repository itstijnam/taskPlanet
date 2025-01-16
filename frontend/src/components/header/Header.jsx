import React from 'react'
import LOGO from '../../assets/taskPlanet.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const {admin} = useSelector((store)=>store.auth)
    const navItem = [
        { text: 'Home', active: true },
        { text: admin? `Admin` : 'Login', active: true },
    ]


    const setLink = (textType)=>{
        if(textType === 'Login'){
         navigate('/login')   
        } else if(textType === 'Home'){
            navigate('/')
        }else if(textType === 'Admin'){
            navigate('/admin')
        }
    }

    return (
        <>
            <header className='header'>
                <nav className='navBox'>
                    <div className='logoBox'>
                        <div className='imageBox'><img src={LOGO} alt="" /></div>
                        <span>Task Planet</span>
                    </div>
                    <ul className='ulNav'>
                        {
                            navItem.map((singleNav, index) => {
                                return (
                                    <div key={index}>
                                        <li onClick={(e)=>setLink(singleNav.text)} >{singleNav.text}</li>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header
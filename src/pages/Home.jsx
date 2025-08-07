// import React, { useState, useEffect } from 'react';
import './styles/Home.css';
export default function Home() {
  return (
   <div className='home-wrapper'>
        {/* Hero */}
        <section className='hero'>
            <div className='background-blur' />
                <div className='content'>
                    <h1 className='welcome-title'>
                        Selamat Datang di Website Desa Abbokongang
                    </h1>
            </div>
        </section>
        <section className='about'>
            <div className='about-card'>
                <div className='about-container'>
                    <h2 className='text-2xl'>Profil</h2>
                    <p className='section-description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fugit, dicta, culpa, quaerat cumque voluptates laudantium labore architecto accusantium reiciendis officia non ad maxime praesentium ab! In alias soluta, qui neque tenetur explicabo veniam, tempora doloremque unde earum odit beatae enim facere ipsum praesentium obcaecati deleniti harum commodi, quis possimus et corporis non eos! Voluptas animi provident cupiditate eveniet perferendis. Voluptate repudiandae dolorem, amet delectus hic sint, nihil odit odio atque, perspiciatis sapiente in. Libero, dicta quam amet dolore iure vero quaerat est mollitia nihil eos in odio quis similique, at ex quidem corrupti rerum? Commodi saepe dolores laboriosam voluptas?
                    </p>
                </div>
                <div className='about-image'>
                </div>
            </div>
            <div className='about-card2'>

            </div>
        </section>
        <section>
            <div className='infographics'>
                <h2 className='section-title'>Infografis</h2>
                <p className='section-description'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fugit, dicta, culpa, quaerat cumque voluptates laudantium labore architecto accusantium reiciendis officia non ad maxime praesentium ab! In alias soluta, qui neque tenetur explicabo veniam, tempora doloremque unde earum odit beatae enim facere ipsum praesentium obcaecati deleniti harum commodi, quis possimus et corporis non eos! Voluptas animi provident cupiditate eveniet perferendis. Voluptate repudiandae dolorem, amet delectus hic sint, nihil odit odio atque, perspiciatis sapiente in. Libero, dicta quam amet dolore iure vero quaerat est mollitia nihil eos in odio quis similique, at ex quidem corrupti rerum? Commodi saepe dolores laboriosam voluptas?
                </p>
            </div>
        </section>
   </div> 
    
  )
}
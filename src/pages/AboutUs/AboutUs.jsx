import React from 'react';
import Footer from '../../components/Home/Footer';
import './AboutUs.css'
const AboutUs=()=>{
    return(

        <div className='about-us'>

            {/* <div className="about-us-header">
                <div className="about-us-container">
                    <h2>ABOUT US</h2>
                </div>
            </div> */}
            <section className='about-page'>
                <div className="about-page-content">

                    <div className="about-page-info">
                        <h1>About Us</h1>
                        <div style={{marginTop:'40px'}}>

                            <h2>India's best Test Series Experts</h2>
                            <p>
                                We, the people of <a href='http://hranker.com' target='blank'>hranker.com</a>, having cleared many of the competitive exams, do hereby pledge to provide you with the best test series. Mock tests are of utmost importance for clearing any competitive exam. We’ve seen the transition from offline to online test medium. Having worked in this industry for more than 3 years, we realized that there is a lot to do for the aspirants. We research every day to provide you with the updated test series. Before launching this website, we had started the daily current affairs series on Facebook and Telegram and got amazed by the response. With 97% votes in favor of us, we are excited about this prelaunch response and will try to deliver these expectations forever.
                            </p>
                        </div>
                    </div>
                    <div className="about-page-info-image">
                        <img src="https://hranker.com/admin/assets/images/pages/about-sitting1.png" alt="" />
                    </div>
                </div>
            </section>
            <Footer/>
        </div>

        
    )
}


// const Footer=()=>{
//     return(

//     )
// }
export default AboutUs;
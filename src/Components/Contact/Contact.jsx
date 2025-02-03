import React, { useRef } from 'react'
import style from './Contact.module.css'
import { Link } from 'react-router-dom'
import support_contact from '../../../public/support-contact.jpg'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast';

export default function Contact () {
  const form = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show loading toast
    const loadingToast = toast.loading('Sending message ...');
 
    try {
      const result = await emailjs.sendForm(
        'service_pltj1ha', 
        'template_jn6o0c8', 
        form.current, 
        { publicKey: 'pSp7huyMwpqKW2NnA' }
      );
      
      // Clear form
      form.current.reset();
      // Success toast
      toast.success('Message sent successfully!', {
        id: loadingToast,
        duration: 4000,
        style: {
          background: '#ff9822',
          color: '#fff',
         
        },
      });
      
    } catch (error) {
      console.log('FAILED...', error.text);
      // Error toast
      toast.error('Failed to send message. Please try again.', {
        id: loadingToast,
        duration: 4000,
        style: {
          background: 'red',
         
        },
      });
    }
  };
  return (
    <>
      <section
        className={`relative flex justify-center items-center w-full min-h-[50vh] contact ${style.contactSection}`}
      >
        <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              "url('../../../public/taqwa-islamic-wordpress-theme.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(60%)'
          }}
        ></div>

        <div className='relative space-y-4 text-center text-white'>
          <p className='font-bold text-4xl'>Contact Us</p>
          <p className='text-[#FF9822] text-lg'>
            <Link
              to='/'
              className={`${style.home_link} text-white hover:cursor-pointer`}
            >
              Home
            </Link>{' '}
            / Contact Us
          </p>
        </div>
      </section>

      {/* have any questions */}
      <section className={`questions my-8 ${style.questionsSection}`}>
        <div className='flex flex-col justify-center items-center mx-auto w-4/5 content'>
          <p className={`text-[#ff9822] ${style.questions} my-2`}>
            Have any Questions...!
          </p>
          <p className={`text-[#222] ${style.get_in_touch} my-2`}>
            Get In Touch
          </p>

          <div className='flex md:flex-row flex-col justify-center items-center gap-6 my-4 w-full'>
            <div className='left-section w-full'>
              <form ref={form} onSubmit={handleSubmit}>
                {/* name and email */}
                <div className='flex md:flex-row flex-col gap-4'>
                  {/* name */}
                  <div className={`relative ${style.parentInput} w-full`}>
                    <input
                      type='text'
                      placeholder='Name'
                      name='from_name'
                      className='px-6 py-2 w-full text-black'
                      required

                    />
                    <span className={` ${style.bottom}`}></span>
                    <span className={` ${style.right}`}></span>
                    <span className={` ${style.top}`}></span>
                    <span className={` ${style.left}`}></span>
                  </div>
                  {/* email */}
                  <div className={`relative ${style.parentInput} w-full`}>
                    <input
                      type='email'
                      placeholder='Email'
                      name='from_email'
                      className='px-6 py-2 w-full text-black'
                      required
                    />
                    <span className={` ${style.bottom}`}></span>
                    <span className={` ${style.right}`}></span>
                    <span className={` ${style.top}`}></span>
                    <span className={` ${style.left}`}></span>
                  </div>
                </div>
                {/* message */}
                <div className='my-4 w-full message'>
                  <textarea
                    placeholder='Message'
                    className='border-[#ff9822] border-2 p-4 w-full'
                    name='message'
                    required
                  ></textarea>
                </div>
                {/* btn submit */}
                <button
                  type='submit'
                  className={`bg-[#ff9822] p-2 rounded-md w-full text-center text-white ${style.btn_shine} hover:bg-[#5c2b00]`}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className='relative right-section w-full'>
              <iframe
                className='w-full'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6921718215817!2d31.26011017541332!3d30.045687974922895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840a2f3fd21f5%3A0x676752c74b1e52e8!2sAl-Azhar%20Mosque!5e0!3m2!1sen!2seg!4v1738531491566!5m2!1sen!2seg'
                style={{ border: 0, height: '300px' }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
              <div className='top-0 bottom-0 absolute inset-x-0 bg-[#1617197a]'></div>
            </div>
          </div>
        </div>
      </section>

      {/* support contact */}
      <section className={`w-full ${style.support_contact_section}`}>
        <div className='flex md:flex-row flex-col justify-center items-start mx-auto w-4/5'>
          <div className='left w-full'>
            <p className={`my-2 text-[#ff9822] ${style.contact_details}`}>
              Contact Details
            </p>
            <p className={`my-2 text-[#222] ${style.get_info}`}>
              Get Information
            </p>

            {/* Contact Info Container */}
            <div className='gap-6 grid grid-cols-1 md:grid-cols-2 my-6'>
              {/* Email */}
              <div className='flex items-center gap-4'>
                <i className='text-[#ff9822] text-2xl fa-envelope fa-solid'></i>
                <div>
                  <p className='font-medium'>Email</p>
                  <p>help@taqwa.com support@taqwa.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className='flex items-center gap-4'>
                <i className='text-[#ff9822] text-2xl fa-phone fa-solid'></i>
                <div>
                  <p className='font-medium'>Phone</p>
                  <p>+20 01119121377</p>
                </div>
              </div>

              {/* Address */}
              <div className='flex items-center gap-4'>
                <i className='text-[#ff9822] text-2xl fa-location-dot fa-solid'></i>
                <div>
                  <p className='font-medium'>Address</p>
                  <p>Cairo,Al-Azahr Mosque</p>
                </div>
              </div>

              {/* Fax */}
              <div className='flex items-center gap-4'>
                <i className='text-[#ff9822] text-2xl fa-fax fa-solid'></i>
                <div>
                  <p className='font-medium'>Phone</p>
                  <p>25925226</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className='right w-full'>
            <img
              src={support_contact}
              alt='support-contact_img'
              className='p-12 rounded-md w-full'
            />
          </div>
        </div>
      </section>
    </>
  )
}

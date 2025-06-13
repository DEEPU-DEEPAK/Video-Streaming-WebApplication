import { FaGithub, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => { 	
    return ( 		
        <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'> 
        <br/>			
            <div className='flex flex-col items-center justify-center gap-4 md:h-24 text-center'> 				
                <p className='text-balance text-center text-sm leading-loose text-muted-foreground'> 					
                    Built by{" "} 					
                    <a 						
                        href='http://github.com/DEEPU-DEEPAK' 						
                        target='_blank' 						
                        rel='noreferrer' 						
                        className='font-medium underline underline-offset-4'> 						
                        DEEPAK 					
                    </a>. The source code is available on{" "} 					
                    <a 						
                        href='http://github.com/DEEPU-DEEPAK' 						
                        target='_blank' 						
                        rel='noreferrer' 						
                        className='font-medium underline underline-offset-4'> 						
                        GitHub 					
                    </a>. 				
                </p>
                
                {/* Social Media Links */}
                <div className='flex gap-4 mt-4'>
                    <a href='https://github.com/DEEPU-DEEPAK' target='_blank' rel='noreferrer'>
                        <FaGithub className='text-2xl hover:text-gray-400' />
                    </a>
                    <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
                        <FaInstagram className='text-2xl hover:text-gray-400' />
                    </a>
                    <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
                        <FaFacebook className='text-2xl hover:text-gray-400' />
                    </a>
                    <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                        <FaYoutube className='text-2xl hover:text-gray-400' />
                    </a>
                </div> 			
            </div> 
            <br/>		
        </footer> 	
    ); 
}; 

export default Footer;

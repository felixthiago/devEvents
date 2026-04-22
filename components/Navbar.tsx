import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return ( 
        <header>
            <nav>
                <Link href = '/' className = 'logo'>
                    <Image src ='/icons/logo.png' alt = 'logo' width = {32} height = {32} />
                    <p>DevEvents</p>
                </Link>
            
                <ul className = 'events'>
                    <Link href = '/'>Home</Link>
                    <Link href = '/'>Events</Link>
                    <Link href = '/'>Create Event</Link>
                </ul>
            </nav>


        </header>
    )
}

export default Navbar;

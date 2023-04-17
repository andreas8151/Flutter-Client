//Style
import './Navbar.css'
export default function Navbar({ children }) {
    return (<div className="Navbar">
        <p>Children incoming</p>
        {children.map((child) => (
            <div className='Child-container'>
                {child}
            </div>
        )

        )}
    </div>)

}
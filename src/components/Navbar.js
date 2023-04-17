//Style
import './Navbar.css'
export default function Navbar({ children }) {
    return (<div className="Navbar">
        <p>Children incoming</p>
        {children.map((child, index) => (
            <div key={`Nav-child-${index}-container`}className='Child-container'>
                {child}
            </div>
        )

        )}
    </div>)

}
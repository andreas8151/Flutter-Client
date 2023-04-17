//Style
import './Textbox.css'
export default function Textbox({title, text}){
    return(
        <div className="Textbox">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}
//Style
import './Button.css'
export default function({title, handler}){
    return(
        <button className="Button" onClick={handler}>{title}</button>
    )

}


import { Link } from "react-router-dom";

const ErrorPage = (props) => {
    return(
        <div className='error'>
            <h2>{props.message}</h2>
            <Link className="btn" to='/'>Home</Link>
        </div>
    )
}

export default ErrorPage;
// Reusable error page for different error handlings
import { NavLink } from "react-router-dom";

function ErrorPage() {

    return (
        <div className="error-page">
            <h1>Error 404</h1>
            <h3>Page not found!</h3>
            <NavLink className='back-home' to='/'>Back to Home</NavLink>
        </div>
    )
}

export default ErrorPage;

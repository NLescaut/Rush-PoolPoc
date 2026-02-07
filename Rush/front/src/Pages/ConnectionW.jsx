import ButtonS from "./ButtonS";
import { Link } from 'react-router-dom';
import '../App.css';

function Login() {
  return (
    <div className="encadreC">
      <div className="connection">
        <form action='' method='post'>
          <div className="connection">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="connection">
            <label htmlFor="email">Email</label>
            <input type='email' id="email" />
          </div>
          <div className="connection">
            <label htmlFor="password">Password</label>
            <input type='password' id="password" />
          </div>
        </form>
      </div>
    </div>
  )
}

function Warning() {
  return (
    <>
      <h1>Login</h1>
      <Login/>
      <p className="espace">
       “Warning: this website aims to humorously denounce the actions of well-known individuals when they believe themselves to be untouchable.
        We have therefore listed all the celebrities who attended, whether they were for or against it.
        We strongly encourage you to do your own research to obtain more information.”
      </p>
      <Link to='/game'>
        <ButtonS/>
      </Link>
    </>
  )
}

export default Warning;

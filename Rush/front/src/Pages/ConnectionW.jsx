import ButtonS from "./ButtonS"
import {Link} from 'react-router-dom'


function Login(){
  return(
    <div className="encadreC">
      <h1>Login</h1>
      <div className="connection">
        <from action='' method='post'>
          <div className="connection">
            <label htmlFor="">Name</label>
            <input type="Name" />
          </div>
          <div className="connection">
            <label htmlFor="">email</label>
            <input type='email'/>
          </div>
          <div className="connection">
            <label htmlFor="">passeword</label>
            <input type='passeword'/>
          </div>
        </from>
      </div>
    </div>
  )
}

function Warning() {

  return (
    <>

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

export default Warning

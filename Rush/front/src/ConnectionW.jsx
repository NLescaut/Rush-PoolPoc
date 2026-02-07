
function ButtonS(){
    return(
        <button onClick={() => setPage('main')}>
            Suivant
        </button>
    ) 
}

function Login(){
  return(
    <div className="connection">
      <from action='' method='post'>
        <div>
          <label htmlFor="">Name</label>
          <input type="Name" />
        </div>
        <div>
          <label htmlFor="">email</label>
          <input type='email'/>
        </div>
        <div>
          <label htmlFor="">passeword</label>
          <input type='passeword'/>
        </div>
      </from>
    </div>
  )
}

function Warning() {

  return (
    <>
    <div className="encadre">
      <Login/>
    </div>
      <p>
       “Warning: this website aims to humorously denounce the actions of well-known individuals when they believe themselves to be untouchable.
        We have therefore listed all the celebrities who attended, whether they were for or against it.
        We strongly encourage you to do your own research to obtain more information.”
      </p>
      <ButtonS/>
    </>
  )
}

export default Warning
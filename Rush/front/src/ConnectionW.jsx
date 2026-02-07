
function ButtonS(){
    return(
        <button onClick={() => setPage('main')}>
            Suivant
        </button>
    ) 
}

function Login(){
  
}

function Warning() {

  return (
    <>
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
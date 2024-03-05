import { useEffect } from "react";


const Cleanup = () => {
  const connect = () => console.log('Connected');
  const disconnect = () => console.log('Disconnected');

  useEffect(() => {
    connect();

    return () => disconnect();
  }) 
  
  return (
    <div className="container my-5">
        <h2>Cleaning up Effect hook</h2>
    </div>
  )
}

export default Cleanup
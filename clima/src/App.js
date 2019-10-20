import React, { useState, useEffect } from 'react';
import Header from './Componentes/Header';
import Formulario from './Componentes/Formulario';
import Error from './Componentes/Error';
import Clima from './Componentes/Clima';


function App() {

  //State ppal
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    if (ciudad === '') return;

    const consultarAPI = async () => {
      const appId = 'fababf5810cede1cdb71c6431ba51d4e';
      const url = `https://api.openweathermap.org/data/2.5/weath
er?q=${ciudad},${pais}&appid=${appId}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);
    }

    consultarAPI();

  }, [ciudad, pais]);


  const datosConsulta = datos => {

    if (datos.ciudad === '' || datos.pais === '') {
      guardarError(true);
      return;
    }

    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }



  //cargar un componente condicionalmente
  let componente;
  if (error) {
    //hay un error , mostrarlo
    componente = <Error
      mensaje='Ambos campos son obligatorios'
    />;
  }
  else if (resultado.cod === '404') {
    componente = <Error mensaje="La ciudad o el pais son erroneos" />
  }
  else {
    //mostrar clima
    componente = <Clima
      resultado={resultado}
    />;
  }

  return (
    <div className="App">
      <Header
        titulo="Clima App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React,  {useState} from 'react';

function Formulario({datosConsulta}) {


    //state del componente
    // busqueda = state , guardaBusqueda = this.setState({})
    const [busqueda,guardarBusqueda] = useState ({
        ciudad : '',
        pais : ''
    })


    const handleChange = e => {
        //cambiar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const consultarClima = e => {
        e.preventDefault();

        // pasar hacia el componente principal la busqueda
        datosConsulta(busqueda);
    }
    return (
        <form
            onSubmit = {consultarClima}
        >
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select onChange = {handleChange} name="pais">
                    <option value="">Selecciona un pais</option>
                    <option value="US">Estados Unidos</option>
                    <option value="AR">Argentina</option>
                    <option value="VE">Venezuela</option>
                    <option value="CO">Colombia</option>
                    <option value="ES">España</option>
                </select>
            </div>

            <div className= "input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-large 
                btn-block yellow accent-4 " value ="Buscar clima"/>
            </div>           
        </form>
    )
}
export default Formulario;
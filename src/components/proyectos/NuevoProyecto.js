import React, { Fragment, useState, useContext } from 'react';
import proyectoContex from '../../context/proyectos/proyectoContex';
const NuevoProyecto = () => {

    //obtener el state del formulario 
    // de esta forma se pueden pasar de un componente a otro aunque este
    // este muy adentro del arbol de componentes

    const proyectosContex = useContext(proyectoContex);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContex;



    //State para el proyecto 
    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    });
    //extraer nombre del proyecto
    const { nombre } = proyecto;
    //lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    //cuando el usuario envia un proyecto

    const onSubmitProyecto = e => {
        e.preventDefault();
        
        // validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto)

        //reiniciar el form
        guardarProyecto({
            nombre: ''
        })
        
    }

    // mostar el formulario 
    const onClickFormulario = () => {
        mostrarFormulario();
    }


    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo proyecto</button>

            {
                formulario ? 
                (
                    <form 
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                    >
                    <input 
                        type="text" 
                        className="input-text" 
                        placeholder="Nombre proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
    
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar proyecto"
                    />
                    
    
                    </form>                   
                )
                : null }

                {errorformulario ?  (<p className="mensaje error">El nombre es obligatorio</p> ): null}

        </Fragment>
        
     );
}
 
export default NuevoProyecto;
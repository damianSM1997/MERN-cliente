//import React from 'react';
import React, {useContext } from 'react';
import proyectoContex from '../../context/proyectos/proyectoContex';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {
    // obtener el state de proyectos
    const proyectosContex = useContext(proyectoContex);
    const { proyectoActual } = proyectosContex;
    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    //funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //fijar un proyecto actual
        obtenerTareas(id); //filtar las tareas cuando se de click
    }
           
    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
                >{proyecto.nombre}</button>
        </li>
    );
}

export default Proyecto;
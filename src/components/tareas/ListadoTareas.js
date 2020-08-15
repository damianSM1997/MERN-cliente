import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContex from '../../context/proyectos/proyectoContex';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {

    //extrae los proyectos del state inical
    const proyectosContex = useContext(proyectoContex);
    const { proyecto, eliminarProyecto } = proyectosContex;

    // obtener las tareas del proyecto
   const tareasContext = useContext(tareaContext);
   const { tareasproyecto } = tareasContext;

   
    
    
    //si no hay proyecto seleccionado 
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    //arar destrocturing para extraer el proyecto actual
    const  [proyectoActual] = proyecto;
    
    //elimina un proyecto    
    const onclickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }


    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {
                    tareasproyecto.length === 0 
                    ? (<li className="tarea">"No hay tareas"</li>)

                    : <TransitionGroup>
                       {tareasproyecto.map(tarea =>(
                           <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                           >
                               <Tarea 
                                    
                                    tarea={tarea}
                                />
                           </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
            type="button"
            className="btn btn-eliminar"
            onClick={onclickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;
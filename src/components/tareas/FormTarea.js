import React, {useContext, useState, useEffect } from 'react';
import proyectoContex from '../../context/proyectos/proyectoContex';
import tareaContext from '../../context/tareas/tareaContext';
const FormTarea = () => {

    //extrae los proyectos esta activo
    const proyectosContex = useContext(proyectoContex);
    const { proyecto } = proyectosContex;
    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { 
        tareaseleccionada, 
        errortarea, 
        agregarTarea, 
        validarTarea, 
        obtenerTareas,
        actualizarTarea,
        limpiarTarea
    } = tareasContext;

    // effect que detecta si hay una tarea sellecionada

    useEffect( () => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //si no hay proyecto seleccionado 
    if(!proyecto) return null

    //arar destrocturing para extraer el proyecto actual
    const  [proyectoActual] = proyecto;

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return
        }

        // si es edicion o si es nueva tarea

        if(tareaseleccionada === null ){
            //tarea nueva
            //agregar la nueva rarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);

            //elimina tarea seleccionada del state
            limpiarTarea();
        }

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }
    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                    type="text"
                    className="input-text"
                    placeholder="Nombre tarea..."
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea' }
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatoriao</p> : null}
        </div>
     );
}
 
export default FormTarea;
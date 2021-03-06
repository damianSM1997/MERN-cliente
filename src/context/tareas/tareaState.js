import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
//import { v4 as uuidv4} from 'uuid';
import clienteAxios from '../../config/axios'
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    //ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index';


const TareaState = props => {
    
    const initialState = {

        // tareas: [
        //     { id: 1 , nombre: 'Elegir plataforma', estado: true, proyectoId: 1},
        //     { id: 2 , nombre: 'Elegir colores', estado: false, proyectoId: 2},
        //     { id: 3 , nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3},
        //     { id: 4 , nombre: 'Elegir hosting', estado: true, proyectoId: 4},
        //     { id: 5 , nombre: 'Elegir plataforma', estado: true, proyectoId: 1},
        //     { id: 6 , nombre: 'Elegir colores', estado: false, proyectoId: 2},
        //     { id: 7 , nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3},
        //     { id: 8 , nombre: 'Elegir plataforma', estado: true, proyectoId: 1},
        //     { id: 9 , nombre: 'Elegir colores', estado: false, proyectoId: 2},
        //     { id: 10 , nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3},
        //     { id: 11 , nombre: 'Elegir plataforma', estado: true, proyectoId: 4},
        //     { id: 12 , nombre: 'Elegir colores', estado: false, proyectoId: 1},
        //     { id: 13 , nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 2},
        //     { id: 14 , nombre: 'Elegir plataforma', estado: true, proyectoId: 3},
        //     { id: 15 , nombre: 'Elegir colores', estado: false, proyectoId: 4},
        //     { id: 16 , nombre: 'Elegir plataforma de pago', estado: false, proyectoId: 3},
        // ],
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null

    }

    // creamos el dispatch y el state

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //creando las funciones

    // obtener las tareas de un proyecto en espesifico
    const obtenerTareas = async proyecto => {
        
        

        try {
            const resultado = await clienteAxios.get('/api/tareas/', {params: {proyecto}});
            console.log(resultado.data.tareas);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
            
        } catch (error) {
            console.log(error);
        }
    }
    //agregar una tarea al proyecto selecciona
    const agregarTarea = async tarea => {
        console.log(tarea);
        //tarea.id = uuidv4();
        const resultado = await clienteAxios.post('/api/tareas/', tarea);
        console.log(resultado);
        try {
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    //edita o modifica una tare
    const actualizarTarea = async tarea => {
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            //console.log(resultado.data.tarea);
            dispatch ({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })

        } catch (error) {
            console.log(error);
        }
    }
    // //cambia el estado de cada tarea

    // const cambiarEstadoTarea = tarea => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    // extrae una tarea para edicion

    const guardarTareaActual = tarea => {
        dispatch ({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    

    //elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareaContext.Provider
        value={{
            //tareas: state.tareas,
            tareasproyecto: state.tareasproyecto,
            errortarea: state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            //cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
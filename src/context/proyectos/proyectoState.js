import React , { useReducer } from 'react';

//import uuid from 'uuid/dist/v4';
import { v4 as uuidv4} from 'uuid';

import proyectoContext from './proyectoContex';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
        } from '../../types/index';
//import Proyecto from '../../components/proyectos/Proyecto';


const ProyectoState = props => {
    
    const proyectos = [
        { id : 1, nombre: 'Tienda Virtual'},
        { id : 2, nombre: 'Intranet'},
        { id : 3, nombre: 'DIseño de sitio web'},
        { id : 4, nombre: 'MEAR'}
    ]
    
    const initialState = {
        
        proyectos : [],    
        formulario : false,
        errorformulario: false,
        proyecto: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener lso proyectos
    //siempre lo que se obtenga de la funcion es el payload
    const obtenerProyectos = () => {
        dispatch ({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    //agregar nuevo proyecto

    const agregarProyecto = proyecto => {
        //proyecto.id = uuid.v4();
        proyecto.id = uuidv4();

        //agregamos el proyecto en el STATE
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    //valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // selecciona el proyeacto al que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // elimina n proyecto

    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorformulario: state.errorformulario,
            proyecto: state.proyecto,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
            
        }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;

import React , { useReducer } from 'react';

//import uuid from 'uuid/dist/v4';
//import { v4 as uuidv4} from 'uuid';

import proyectoContext from './proyectoContex';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
        
        } from '../../types/index';
//import Proyecto from '../../components/proyectos/Proyecto';
import clienteAxios from '../../config/axios';

const ProyectoState = props => {
    
    // const proyectos = [
    //     { id : 1, nombre: 'Tienda Virtual'},
    //     { id : 2, nombre: 'Intranet'},
    //     { id : 3, nombre: 'DIseño de sitio web'},
    //     { id : 4, nombre: 'MEAR'}
    // ]


    
    const initialState = {
        
        proyectos : [],    
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null,
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
    const obtenerProyectos = async () => {
        // nota es importante saber que se manda a los componentes
        try {
        const resultado = await clienteAxios.get('/api/proyectos');
        dispatch ({
            type: OBTENER_PROYECTOS,
            payload: resultado.data.proyectos
        })
    
        } catch (error) {

            const alerta = {
                 msg: 'Hubo un error',
                 categoria: 'alerta-error'
             }
             dispatch({
                 type: PROYECTO_ERROR,
                 payload: alerta
             })            
         }
    }

    //agregar nuevo proyecto

    const agregarProyecto = async proyecto => {
        //proyecto.id = uuid.v4();
        //proyecto.id = uuidv4();
        

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
            console.log(resultado);
            //agregamos el proyecto en el STATE
            dispatch({
                type: AGREGAR_PROYECTO,                
                payload: resultado.data
            })
        } catch (error) {

            const alerta = {
                 msg: 'Hubo un error',
                 categoria: 'alerta-error'
             }

             dispatch({
                 type: PROYECTO_ERROR,
                 payload: alerta
             })            
         }
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

    const eliminarProyecto = async proyectoId => {    
            
         try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
         } catch (error) {

            const alerta = {
                 msg: 'Hubo un error',
                 categoria: 'alerta-error'
             }

             dispatch({
                 type: PROYECTO_ERROR,
                 payload: alerta
             })

            
         }
    }

    return (
        <proyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorformulario: state.errorformulario,
            proyecto: state.proyecto,
            mensaje: state.mensaje,
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

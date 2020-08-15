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

export default (state, action) => {
    switch(action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                //tareasproyecto: state.tareasproyecto.filter(tarea => tarea.proyectoId === action.payload)
                // este cambio se hace porque el fintrado ya esta desde nuestra api                
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                //areglo nuevo de tareas mas la nueva
                tareasproyecto: [ action.payload, ...state.tareasproyecto],
                errortarea: false                
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
        //case ESTADO_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea ),
                //tareaseleccionada: null
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null
            }          
        default:
        return state;
    }
}
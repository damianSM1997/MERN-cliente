import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto'
import proyectoContex from '../../context/proyectos/proyectoContex'
import AlertaContext from '../../context/alertas/alertaContext'
import { TransitionGroup, CSSTransition} from 'react-transition-group'

const ListadoProyectos = () => {

     //obtener el state del formulario 
    // de esta forma se pueden pasar de un componente a otro aunque este
    // este muy adentro del arbol de componentes
    //extrae proyectos de StateInicial
    const proyectosContex = useContext(proyectoContex);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContex;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //obtener proyectos cuando carga el componente 
    useEffect(() =>{
        // si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)            
        }
        obtenerProyectos();
        // eslint-disable-next-line        
    }, [mensaje]);
    
    //revisa si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, Comienza creando uno :)</p>;

    
    

    return ( 
        <ul className="listado-proyectos"> 
            {alerta ? (<div className={`alerta ${alerta.categoria}`} > {alerta.msg}</div> ) : null}
            
            <TransitionGroup>                
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto                        
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}            
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;
import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto'
import proyectoContex from '../../context/proyectos/proyectoContex'
import { TransitionGroup, CSSTransition} from 'react-transition-group'

const ListadoProyectos = () => {

     //obtener el state del formulario 
    // de esta forma se pueden pasar de un componente a otro aunque este
    // este muy adentro del arbol de componentes
    //extrae proyectos de StateInicial
    const proyectosContex = useContext(proyectoContex);
    const { proyectos, obtenerProyectos } = proyectosContex;
    //obtener proyectos cuando carga el componente 
    useEffect(() =>{
        obtenerProyectos();
        // eslint-disable-next-line        
    }, []);
    
    //revisa si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, Comienza creando uno :)</p>;

    
    

    return ( 
        <ul className="listado-proyectos"> 
            <TransitionGroup>                
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
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
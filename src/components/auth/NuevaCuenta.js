import React, { useState } from 'react';
import {Link} from 'react-router-dom'
const NuevaCuenta = () => {

    //state para iniciar sesion 
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //extraer de usuario

    const { nombre, email, password, confirmar } = usuario;

    const onChange = e => {
        guardarUsuario({
            //copia del usuario
            ...usuario,
            //guarda el nuevo usuario
            [e.target.name] : e.target.value
        })
    }
    // cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        
        e.preventDefault();
        
        //validar que no se tengan campos vasios

        //passwor minimo de 6 caracteres

        // los 2 passwords son iguales

        //pasar al action

    }
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                <div className="campo-form">
                <label htmlFor="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={onChange}
                />
                </div>
                <div className="campo-form">
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Tu imail"
                    value={email}
                    onChange={onChange}
                />                
                </div>
                <div className="campo-form">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Tu Password"
                    value={password}
                    onChange={onChange}
                />                
                </div>
                <div className="campo-form">
                <label htmlFor="confirmar">Confirmar password</label>
                <input 
                    type="password"
                    id="confirmar"
                    name="confirmar"
                    placeholder="Repite tu password"
                    value={confirmar}
                    onChange={onChange}
                />                
                </div>

                <div className="campo-form">
                    <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                </div>
            </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar sesión
                </Link>
            </div>                        
        </div>
    );
}
 
export default NuevaCuenta;
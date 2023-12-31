import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

    const [ nombre, setNombre ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ fechaEntrega, setFechaEntrega ] = useState('');
    const [ cliente, setcliente ] = useState('');

    const params = useParams();
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

    useEffect(() => {
        // opcion 1
        // if ( proyecto.nombre) {
        //     setNombre(proyecto.nombre)
        //     setDescripcion(proyecto.descripcion)
        //     setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
        //     setcliente(proyecto.cliente)
        // } 
        // opcion 2, con optional chaining
        if ( params.id) {
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setcliente(proyecto.cliente)
        } 
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault()

        if ( [ nombre, descripcion, fechaEntrega, cliente ].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return;
        }

        // Pasar los datos hacia el provider
        await submitProyecto({id: params.id, nombre, descripcion, fechaEntrega, cliente})

        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setcliente('')
    }

    const { msg } = alerta;


  return (
    <form 
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}    
    >

        { msg &&  <Alerta alerta={alerta} />}

        <div className="mb-5">
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='nombre'
            >
                Nombre Proyecto
            </label>
            
            <input 
                id='nombre'
                type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Proyecto'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='descripcion'
            >
                Descripcion
            </label>
            
            <textarea 
                id='descripcion'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Descripcion del Proyecto'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            ></textarea>
        </div>

        <div className="mb-5">
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='fecha-entrega'
            >
                Fecha Entrega
            </label>
            
            <input 
                id='fecha-entrega'
                type="date" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='nombre'
            >
                Nombre Cliente
            </label>
            
            <input 
                id='cliente'
                type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Cliente'
                value={cliente}
                onChange={e => setcliente(e.target.value)}
            />
        </div>

        <input 
            type="submit" 
            value={ params.id ? 'Actualizar Proyecto' : 'Crear Proyecto' }
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
    </form>
  )
}

export default FormularioProyecto
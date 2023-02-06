export default function validations (values) {
    const errors = {};

    if (!values.title) errors.title = "Por favor ingresa un título";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/.test(values.title)) errors.title = "Título inválido";
    else if (/^\s/.test(values.title)) errors.title = 'El título no puede empezar con espacios en blanco';
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{10,45}$/.test(values.title)) errors.title = 'Debe tener entre 10 y 45 carácteres';
    
    if (!values.reason) errors.reason = "Por favor ingresa una causa";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/.test(values.reason)) errors.reason = "Causa inválida";
    else if (/^\s/.test(values.reason)) errors.reason = 'La causa no puede empezar con espacios en blanco';
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{10,150}$/.test(values.reason)) errors.reason = 'Debe tener entre 10 y 150 carácteres';
    
    if (!values.description) errors.description = "Por favor haz una decripción";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/.test(values.description)) errors.description = "Causa inválida";
    else if (/^\s/.test(values.description)) errors.description = 'La descripción no puede empezar con espacios en blanco';
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{50,300}$/.test(values.description)) errors.description = 'Debe tener entre 50 y 300 carácteres';
    
    if (!values.goal) errors.goal = "Por favor ingresa una meta";
    else if (values.goal <= 0) errors.goal = 'La meta no puede ser igual o menor a 0';
    else if (!/^[0-9]*$/.test(values.goal)) errors.goal = "Tiene que ser un número";
    else if (!/^[0-9]{1,9}$/.test(values.goal)) errors.goal = 'Debe tener entre 1 y 9 dígitos';

    return errors;
}

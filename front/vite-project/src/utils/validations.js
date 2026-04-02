export const loginValidations = (input) => {
    const errors = {}

    if(!input.username.trim()) {
        errors.username = "El nombre de usuario es obligatorio"
    }

    if(!input.password.trim()) {
        errors.password = "La contraseña es obligatoria"
    }

    return errors
}

export const registerValidations = (input) => {
    const errors = {}

    if(!input.name.trim()) {
        errors.name = "El nombre es obligatorio"
    } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.name)) {
        errors.name = "El nombre solo puede contener letras y espacios"
    }

    if(!input.email.trim()) {
        errors.email = "El correo electrónico es obligatorio"
    } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
        errors.email = "El correo electrónico no es válido"
    }

    if(!input.birthdate) {
        errors.birthdate = "La fecha de nacimiento es obligatoria"
    } else {
        const today = new Date()
        const birthdate = new Date(input.birthdate)
        const age = today.getFullYear() - birthdate.getFullYear()
        const monthDiff = today.getMonth() - birthdate.getMonth()
        const dayDiff = today.getDate() - birthdate.getDate()

        if (
            age < 18 ||
            (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
        ) {
            errors.birthdate = "Debes tener al menos 18 años"
        }
    }

    if (!input.nDni) {
        errors.nDni = "El número de DNI es obligatorio"
    } else if (!/^\d+$/.test(input.nDni)) {
        errors.nDni = "El número de DNI debe contener solo números"
    } else if (input.nDni.length < 7 || input.nDni.length > 8) {
        errors.nDni = "El número de DNI debe tener entre 7 y 8 dígitos"
    }

    if(!input.username.trim()) {
        errors.username = "El nombre de usuario es obligatorio"
    } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
        errors.username = "El nombre de usuario solo puede contener letras y números"
    }

    if(!input.password.trim()) {
        errors.password = "La contraseña es obligatoria"
    } else if (input.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres"
    } else if (!/[A-Z]/.test(input.password)) {
        errors.password = "La contraseña debe contener al menos una letra mayúscula"
    } else if (!/[a-z]/.test(input.password)) {
        errors.password = "La contraseña debe contener al menos una letra minúscula"
    } else if (!/[0-9]/.test(input.password)) {
        errors.password = "La contraseña debe contener al menos un número"
    } else if (!/[^A-Za-z0-9]/.test(input.password)) {
        errors.password = "La contraseña debe contener al menos un carácter especial"
    }

    return errors
}

export const dateTimeValidates = (inputs) => {
    const errors = {}

    const { date, time } = inputs

    const selectedDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const tentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    if (!date) {
        errors.date = "La fecha es obligatoria"
    } else if (selectedDateTime < now) {
        errors.date = "La fecha y hora seleccionadas deben ser futuras"
    } else if (selectedDateTime < tentyFourHoursLater) {
        errors.date = "Debe seleccionar una fecha y hora con al menos 24 horas de anticipación"
    } else if (
        selectedDateTime.getDay() === 0 ||
        selectedDateTime.getDay() === 6
    ) {
        errors.date = "No se pueden agendar turnos los fines de semana"
    }

    if (!time || time.trim() === "") {
        errors.time = "La hora es obligatoria";
    }
    
    return errors
}
export interface AsistenciaSitio {
    id: string;
    fecha: Date;
    ubicacion: string;
    tecnico: {
        id: string;
        nombre: string;
        apellido: string;
    };
    estado: 'pendiente' | 'en-progreso' | 'completada' | 'cancelada';
    descripcion?: string;
    equipos?: {
        id: string;
        nombre: string;
        serie: string;
    }[];
    observaciones?: string;
}
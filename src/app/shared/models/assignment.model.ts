export interface AssignmentResponse {
  id_pelicula_sala?: string;
  id_pelicula: string;
  id_sala: string;
  fecha_publicacion: Date | string;
  fecha_fin: Date | string;
  activo?: boolean;
}

export interface AssignmentResponseDTO {
  id_pelicula_sala?: string;
  nombre_pelicula: string;
  nombre_sala: string;
  fecha_publicacion: Date | string;
  fecha_fin: Date | string;
  activo?: boolean;
}

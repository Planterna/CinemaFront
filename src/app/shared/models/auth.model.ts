export interface AuthInterface {
  id_usuario?: string;
  nombre?: string;
  email: string;
  password: string;
  rol?: string;
  activo?: boolean;
  creado_en?: Date | string;
  actualizado_en?: Date | string;
}

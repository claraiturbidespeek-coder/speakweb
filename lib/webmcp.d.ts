import "react";

/* Atributos de WebMCP declarativo: describen los formularios de lead como
   herramientas para un agente de IA. El agente puede rellenar los campos, pero
   el envío lo confirma siempre una persona.

   `toolautosubmit` no se declara a propósito: si alguien lo escribe en un
   formulario, TypeScript lo marca como error.

   El genérico `T` no se usa, pero la fusión de interfaces exige repetir la
   firma de React tal cual. */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
  }
  interface SelectHTMLAttributes<T> {
    toolparamdescription?: string;
  }
  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}

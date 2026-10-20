import "intl-tel-input/styles";
import intlTelInput from "intl-tel-input";

/* La librería del campo de teléfono y su hoja de estilos, juntas en un módulo
   que solo se importa con import() desde CampoTelefono. Así quedan en un chunk
   aparte que el navegador pide al abrir un formulario, nunca en la carga
   inicial de la página. El script de validación (intl-tel-input/utils) va en
   otro chunk aparte: lo pide la propia librería con loadUtils.

   La hoja de la librería es global y queda fuera de las capas, pero solo toca
   sus propias clases .iti*. Lo nuestro va en CampoTelefono.module.css. */
export default intlTelInput;

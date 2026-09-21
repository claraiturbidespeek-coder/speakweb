"use client";

import { usePathname } from "next/navigation";
import useModoLanding from "@/app/components/nav/useModoLanding";
import { idiomaDeRuta, NO_ESPECIFICADO, OPCIONES_IDIOMA } from "@/lib/atribucion";

/* El idioma que le interesa al visitante, en los dos formularios del sitio
   (el modal de contacto y el del flotante de WhatsApp). Viaja como `idioma`.

   - Fuera de /idioma/: selector obligatorio, sin nada preseleccionado.
   - En una página de /idioma/: el mismo selector, con el idioma de la página
     ya elegido; el visitante lo puede cambiar.
   - En modo landing: no se muestra. Va oculto con el idioma de la página,
     porque la landing de campaña no debe pedir un dato que ya sabe.

   `key` con la ruta: el formulario vive en el layout y no se vuelve a montar
   al navegar, así que sin ella el select conservaría la elección de la página
   anterior en vez de tomar el idioma de la nueva. */
export default function CampoIdioma({ id }: { id: string }) {
  const ruta = usePathname();
  const landing = useModoLanding();
  const idiomaPagina = idiomaDeRuta(ruta);
  const dePagina = idiomaPagina !== NO_ESPECIFICADO;

  if (landing && dePagina) {
    return <input type="hidden" name="idioma" value={idiomaPagina} />;
  }

  return (
    <div className="sp-form-group">
      <label htmlFor={id}>¿Qué idioma le interesa? *</label>
      <select
        key={ruta}
        id={id}
        name="idioma"
        required
        defaultValue={dePagina ? idiomaPagina : ""}
      >
        <option value="" disabled>
          Seleccione un idioma
        </option>
        {OPCIONES_IDIOMA.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
}

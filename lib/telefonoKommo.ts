/* Teléfono del contacto de Kommo, en el formato con que Kommo guarda los
   contactos de WhatsApp en México: +521 y los diez dígitos. Así el lead del
   formulario cae sobre el mismo contacto que la conversación de WhatsApp.

   Solo se usa para el campo PHONE del contacto en app/api/lead/route.ts. El
   correo, la nota del lead y el CRM de SCNDAL siguen con el teléfono tal como
   lo escribió el visitante.

   Nunca lanza: lo que no encaja en ninguna regla se devuelve tal como llegó y
   se deja constancia en el log. El formato del teléfono no bloquea un lead.

   La regla de los diez dígitos solo vale sin + delante: "+49 30 1234567" tiene
   diez dígitos, pero el + dice que ya trae su prefijo de país, así que se trata
   como extranjero y no se le antepone +521. */
export function telefonoParaKommo(telefono: string): string {
  const limpio = telefono.replace(/[\s\-.()]/g, "");
  const conMas = limpio.startsWith("+");
  const digitos = conMas ? limpio.slice(1) : limpio;

  if (/^\d+$/.test(digitos)) {
    if (!conMas && digitos.length === 10) return `+521${digitos}`;
    if (/^52\d{10}$/.test(digitos)) return `+521${digitos.slice(2)}`;
    if (/^521\d{10}$/.test(digitos)) return `+${digitos}`;
    if (conMas && !digitos.startsWith("52")) return `+${digitos}`;
  }

  console.warn("Kommo: teléfono sin formato reconocible; se envía tal cual", {
    telefono,
  });
  return telefono;
}

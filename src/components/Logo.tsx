// Logotipo original do LaBioCAD: "La" + "Bio" + "Cad", cada parte em uma fonte diferente.
export default function Logo() {
  return (
    <span className="logo" aria-label="LaBioCAD">
      <span aria-hidden="true" className="logo-la">La</span>
      <span aria-hidden="true" className="logo-bio">Bio</span>
      <span aria-hidden="true" className="logo-cad">Cad</span>
    </span>
  );
}

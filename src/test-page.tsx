export function TestPage() {
  const images = [
    'https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png',
    'https://vignette.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg',
    'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
    'https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png',
    'https://vignette.wikia.nocookie.net/starwars/images/c/c6/Greedo.jpg',
    'https://vignette.wikia.nocookie.net/starwars/images/0/00/BiggsHS-ANH.png',
    'https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg',
    'https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
    'https://vignette.wikia.nocookie.net/starwars/images/e/eb/JekPorkins-DB.png',
  ];
  return (
    <div className="test">
      {images.map((image, index) => (
        <div key={index} style={{ paddingTop: index === 3 ? '60px' : '0px' }}>
          <img
            src={image}
            style={{ marginTop: index === 3 ? '60px' : '0px' }}
          />
        </div>
      ))}
    </div>
  );
}

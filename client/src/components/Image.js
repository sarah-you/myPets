export default function Image({ img }) {
  return <img className="carousel-img" src={img.url} alt={img.alt}></img>;
}

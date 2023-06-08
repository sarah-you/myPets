export default function Image({ img }) {
  return <img src={img.url} alt={img.alt}></img>;
}

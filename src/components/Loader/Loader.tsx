import './Loader.scss';

type LoaderProps = {
  label?: string;
};

function Loader({ label }: LoaderProps) {
  return (
    <div className="loader">
      <div className="spinner"> </div>
      {label && <div className="label">{label}</div>}
    </div>
  );
}

export default Loader;

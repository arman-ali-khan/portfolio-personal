import { FlapperSpinner } from 'react-spinners-kit';


function Preloader() {
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="w-24 h-24 flex items-center mask mask-squircle justify-center bg shadow-lg">
          <FlapperSpinner  size={50} color="#fff" loading={true} />
        </div>
      </div>
    );
}

export default Preloader;
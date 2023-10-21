import loader from "../assets/loader.svg";

const Loader = ({ top='h-[calc(90vh)]' }) => {
  return (
    <div className={`flex items-center mx-auto w-full ${top ? top : "mt-32"}`}>
      <div className="w-16 h-16 mx-auto">
        <svg className="w-full h-full">
          <image href={loader} className="md:w-full h-full" />
        </svg>
      </div>
    </div>
  );
};

export default Loader;

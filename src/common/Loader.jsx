import loader from "../assets/loader.svg";

const Loader = ({ top='h-[calc(90vh)]',size='w-12 h-12', margin='mx-auto' }) => {
  return (
    <div className={`flex items-center ${margin} w-full ${top ? top : "mt-32"}`}>
      <div className={`${size} ${margin}`}>
        <svg className="w-full h-full">
          <image href={loader} className="md:w-full h-full" />
        </svg>
      </div>
    </div>
  );
};

export default Loader;

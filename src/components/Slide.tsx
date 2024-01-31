import Slider from "react-slick";

const Slide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="h-96" >
      <Slider {...settings} >
        <div>
          <img src="https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Home page" className="size-full h-96 object-cover"/>
        </div>
        <div>
          <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Home page" className="size-full h-96  object-cover"/>
        </div>
      </Slider>
    </div>
  );
};

export default Slide;

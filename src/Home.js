import "./Home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src="/images/home-image.jpg" alt="" />
        <div className="home__row">
          <Product title="The Lean Startup: A one day read to make you more productive and fittest, gift it to relatives or try to make it read by your children in spare time." price={33.22} image="/images/lean-startup.jpg" rating={5}/>
          <Product title="Bajaj Juicer Mixer: A perfect mixer grinder and a perfect home solution to get instant powerder of anything you want, or any fruit juice you want." price={55.22} image="/images/juicer.jpg" rating={3} />
        </div>
        <div className="home__row">
          <Product title="Curved Gaming Monitor: Are you a gamer obsessed with augmented reality, try out this curved display monitor and get realtime experience on tv." price={350.9} image="/images/curved.jpg" rating={3} />
          <Product title="The Amazon Echo: This is a AI tool which works like your friend, tell you jokes, may help you to shift your AC power without a remote. Try it please" price={99.99} image="/images/echo.jpg" rating={4} />
          <Product title="Ipad Pro : Apple product with highest demand among students, try this and no need to carry heap of notebooks, just write and store within." price={750} image="/images/ipad.jpg" rating={5} />
        </div>
        <div className="home__row">
          <Product title="PlayStation 5 : Always in demand product among gamers is now more refined and optimised with latest graphics, try out to get exotic experience." price={550.09} image="/images/ps5.jpg" rating={4} />
        </div>
      </div>
    </div>
  );
};

export default Home;



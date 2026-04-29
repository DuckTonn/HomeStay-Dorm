import ItemCardL from "../components/ItemCardL";
import { SearchBar } from "@/components/SearchBar";
import Filter  from "@/components/Filter";
import heroBackground from "@/assets/images/hero.png"; 

const Homepage = () => {
  // A simple array to mock 8 cards rendering on the screen for the prototype
  const mockListings = Array.from({ length: 20 });

  return (
    <main className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative flex h-[600px] w-full flex-col items-center justify-center px-4">
        
        {/* Background Image with a slight dark overlay so the white search bar pops */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black" /> 
          <div className="absolute inset-0 bg-linear-to-b from-[#FFFAF0] to-[#731900] opacity-15" /> 
          <img 
            src={heroBackground} 
            alt="Beautiful Home" 
            className="h-full w-full object-cover opacity-50" 
          />

        </div>

        <p className="absolute z-2 text-5xl be-vietnam-pro-bold text-white mb-20">
            Tìm địa điểm sống lý tưởng nhất
        </p>

        {/* Search & Filter Controls */}
        <div className="relative z-10 mt-62 flex w-full max-w-4xl flex-col items-center justify-center gap-4 sm:flex-row">
          <SearchBar />
          <Filter pos={"right-[-10px]"}/>
        </div>

      </section>

      {/* Listings Grid Section */}
      <section className="mx-auto max-w-7xl px-8 py-16">
        
        {/* Responsive Grid: 
          1 column on mobile, 2 on tablets, 3 on small laptops, 4 on desktops 
        */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          
          {/* We map over the array to render 8 identical mock cards */}
          {mockListings.map((_, index) => (
            <ItemCardL key={index} />
          ))}
          
        </div>

      </section>
      
    </main>
  );
}

export default Homepage;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Users, Shield, Calendar, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { trackExternalLink } from "@/lib/analytics";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-white to-secondary dark:from-gray-900 dark:to-gray-800">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 to-primary/85 dark:from-gray-900/95 dark:to-gray-800/90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30"
          style={{
            backgroundImage: "url('/images/hockey_action_1.webp')"
          }}
        ></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-black dark:text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] dark:drop-shadow-lg">
            ARL Hockey
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-black dark:text-white drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-md">
            Adult Recreational League - Burlington's premier co-ed recreational hockey community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-black dark:text-white drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-md">
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              <span>Burlington, Ontario</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              <span>Co-Ed • Beginner Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* League Site Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-card dark:bg-card h-full">
            <CardContent className="p-8 h-full">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-navy-deep dark:text-primary">ARL Hockey League</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed flex-grow">
                  Join our social co-ed hockey league serving Burlington, Hamilton, Milton, and Oakville. 
                  Perfect for beginners and experienced players looking for a fun, non-competitive environment.
                </p>
                <div className="space-y-3 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Friday Nights & Sunday Afternoons</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Non-Contact • Social Atmosphere</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 group-hover:shadow-lg mt-auto"
                  onClick={() => {
                    trackExternalLink('https://www.rookiehockey.ca', 'ARL Hockey League');
                    window.open('https://www.rookiehockey.ca', '_blank');
                  }}
                >
                  Visit League Site
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Board Site Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-card dark:bg-card h-full">
            <CardContent className="p-8 h-full">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 bg-navy-deep dark:bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Shield className="h-10 w-10 text-white dark:text-secondary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-navy-deep dark:text-primary">ARL Board</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed flex-grow">
                  The governing body of the ARL, committed to transparency and fair play. 
                  Access league operations, disciplinary information, and administrative updates.
                </p>
                <div className="space-y-3 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Governance & Transparency</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Player Resources & Support</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full border-2 border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground font-semibold py-3 px-8 rounded-xl transition-all duration-300 group-hover:shadow-lg mt-auto"
                  onClick={() => {
                    trackExternalLink('https://board.arl.hockey', 'ARL Board');
                    window.open('https://board.arl.hockey', '_blank');
                  }}
                >
                  Visit Board Site
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-navy-deep dark:text-foreground">League in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See our community of players enjoying the game in a welcoming, social environment
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {[
            '/images/hockey_action_2.webp',
            '/images/hockey_action_3.webp',
            '/images/hockey_action_4.webp',
            '/images/hockey_action_5.webp',
            '/images/hockey_action_6.webp',
            '/images/hockey_action_1.webp'
          ].map((image, index) => (
            <div key={index} className="aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-muted">
              <img 
                src={image} 
                alt={`ARL Hockey action shot ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">ARL Hockey</h3>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-200">
            Adult Recreational League - Building community through hockey since 2008
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-600 dark:text-gray-300">
            <span>Burlington • Hamilton • Milton • Oakville</span>
            <span className="hidden sm:block">•</span>
            <span>Co-Ed Recreational Hockey</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

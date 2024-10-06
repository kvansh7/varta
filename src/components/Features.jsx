import React from 'react';
import { Link } from 'react-router-dom';
import { translate, voice, imageConvert, context } from '../assets';

const features = [
  {
    title: "Text Translate",
    description: "Translate text from one language to another seamlessly with our advanced text translation feature.",
    image: translate,
    route: "/TextTranslate"
  },
  {
    title: "Voice to Voice",
    description: "Convert spoken words in one language to another instantly. Communicate across languages with ease using our voice-to-voice translation.",
    image: voice,
    route: "/VoiceToVoice"
  },
  {
    title: "Image Conversion",
    description: "Convert images into various formats or extract text from images easily. Simplify image processing for your business needs.",
    image: imageConvert,
    route: "/ImageConversion"
  },
  {
    title: "Contextual Understanding",
    description: "Understand and analyze the context of documents, images, or voice commands for deeper insights and smarter decision-making.",
    image: context,
    externalLink: "http://localhost:8501/" // Changed route to externalLink for this item
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-black"> {/* Reduced padding */}
      <div className="container mx-auto px-4">
        <h2 className="text-5xl text-white text-center font-bold mb-6"> {/* Reduced mb from 12 to 6 */}
          Features
        </h2>

        {/* First Feature with Image on the Left and Text on the Right */}
        <div className="flex items-center mb-8"> {/* Reduced mb from 12 to 8 */}
          <div className="flex-1">
            <img
              src={features[0].image} // Using image instead of video
              alt={features[0].title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg" // Set height to 400px and auto width
            />
          </div>
          <div className="flex-1 p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">{features[0].title}</h3>
            <p className="text-lg mb-4">{features[0].description}</p>
            <Link
              to={features[0].route}
              className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out text-lg font-semibold"
            >
              Learn More →
            </Link>
          </div>
        </div>

        {/* Rest of the Features */}
        <div className="flex flex-col gap-8"> {/* Reduced gap from 12 to 8 */}
          {features.slice(1).map((feature, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-center`}
            >
              <div className="flex-1">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-[300px] object-cover rounded-lg shadow-lg" // Set consistent height of 300px for other features
                />
              </div>
              <div className="flex-1 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg mb-4">{feature.description}</p>
                {/* Conditionally render either Link or a tag based on whether it's an external link or internal route */}
                {feature.externalLink ? (
                  <a
                    href={feature.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out text-lg font-semibold"
                  >
                    Learn More →
                  </a>
                ) : (
                  <Link
                    to={feature.route}
                    className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out text-lg font-semibold"
                  >
                    Learn More →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

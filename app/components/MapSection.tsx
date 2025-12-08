
const MapSection = () => {
  return (
    <section className="w-full">
      <div className="w-full">
        {/* Contenedor del Mapa con sombra y bordes redondeados */}
        <div className="w-full h-[450px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.0267763837483!2d-79.76387862430968!3d8.87709909134684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fac99004e38515f%3A0x47022838ccb3e004!2sMUROS%20PANAM%C3%81%20SHOWROOM!5e0!3m2!1ses-419!2spa!4v1765124070830!5m2!1ses-419!2spa" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
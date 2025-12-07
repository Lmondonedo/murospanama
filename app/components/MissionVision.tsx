export default function MissionVision() {
  return (
    <section id="mision-vision" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#133f65]">
            Nuestro Propósito
          </h2>
          <p className="text-lg text-[#133f65]/80">
            Guiados por valores sólidos y una visión clara hacia el futuro
          </p>
        </div>

        {/* Mission and Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="group relative bg-gradient-to-br from-[#133f65]/5 to-white rounded-3xl p-10 border border-[#133f65]/20 hover:border-[#133f65]/40 transition-all duration-300 hover:shadow-2xl">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#133f65] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#133f65]">
                Nuestra Misión
              </h3>

              <p className="text-lg text-[#133f65]/90 leading-relaxed">
                Proporcionar soluciones de cercado de PVC de la más alta calidad
                a nuestros clientes en Panamá, combinando diseño, durabilidad y
                funcionalidad. Nos comprometemos a ofrecer un servicio
                excepcional, desde la asesoría inicial hasta la instalación
                final, garantizando la satisfacción y tranquilidad de cada
                cliente.
              </p>

              {/* Key Points */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#e37329] flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#133f65]">
                    Calidad superior en cada instalación
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#e37329] flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#133f65]">
                    Servicio personalizado y atento
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#e37329] flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#133f65]">
                    Compromiso con la excelencia
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#133f65]/20 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>
          </div>

          {/* Vision Card */}
          <div className="group relative bg-gradient-to-br from-[#e37329]/5 to-white rounded-3xl p-10 border border-[#e37329]/20 hover:border-[#e37329]/40 transition-all duration-300 hover:shadow-2xl">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#e37329] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#133f65]">
                Nuestra Visión
              </h3>

              <p className="text-lg text-[#133f65]/90 leading-relaxed">
                Ser la empresa líder y referente en Panamá en la instalación de
                cercas de PVC, reconocida por nuestra innovación, calidad
                incomparable y compromiso con la satisfacción del cliente.
                Aspiramos a transformar cada espacio en un lugar más seguro,
                privado y estéticamente agradable.
              </p>

              {/* Key Points */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#e37329] flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#133f65]">
                    Liderazgo en el mercado panameño
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#e37329] flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#133f65]">
                    Innovación constante en diseños
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#e37329] flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#133f65]">
                    Expansión sostenible y responsable
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e37329]/20 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity"></div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-[#133f65] mb-12">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#133f65] to-[#133f65] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-[#133f65]">Integridad</h4>
              <p className="text-sm text-[#133f65]/80">
                Honestidad en cada interacción
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#e37329] to-[#e37329] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-[#133f65]">Calidad</h4>
              <p className="text-sm text-[#133f65]/80">
                Excelencia en resultados
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#133f65] to-[#133f65] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-[#133f65]">Compromiso</h4>
              <p className="text-sm text-[#133f65]/80">Dedicación total</p>
            </div>

            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#e37329] to-[#e37329] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-[#133f65]">Innovación</h4>
              <p className="text-sm text-[#133f65]/80">Mejora continua</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

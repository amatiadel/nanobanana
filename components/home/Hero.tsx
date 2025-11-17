export default function Hero() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Discover the best AI image{' '}
          <span className="relative inline-block">
            <span className="relative z-10">prompts</span>
            <span className="absolute inset-0 bg-yellow-300 rounded-lg -z-0 -m-1"></span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
          Browse thousands of creative AI prompts shared by our community. 
          Find inspiration, copy what you love, and create amazing AI-generated images.
        </p>
      </div>
    </section>
  );
}

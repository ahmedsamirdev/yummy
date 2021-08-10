import { Link } from "react-scroll";
export default function Example() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <div className="relative px-4 pt-6 sm:px-6 lg:px-8"/>
          <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl">
                <span className="block -mb-6 xl:inline">Find a new</span>
                <br />
                <span className="block text-red-600 xl:inline">
                  favorite recipe.
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Browse Taste of Home recipes in a food blog with simple and
                tasty recipes.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    activeClass="active"
                    className="test1"
                    to="test1"
                    spy={true}
                    smooth={true}
                    duration={500}
                    href="#"
                  >
                    <a
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="../bg.webp"
          alt=""
        />
      </div>
    </div>
  );
}

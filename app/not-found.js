/* import KatexSpan  from '@utils/LaTexRender'; */


export default function NotFound() {
    return (
        <div className="relative min-h-[70vh] flex items-center justify-center">
            <div className="max-w-3xl text-center shadow-md rounded-lg p-8">
                <div className="flex gap-4 justify-center text-4xl text-white">
                    {/* <KatexSpan text="$\approx \frac{(16\pi)^2}{5,95} -20,62$" /> */}
                </div>
                <h2 className="text-xl font-semibold mt-2 text-gray-600">
                    The Page you are looking for maybe 
                    <span className="text-green-600"> does exist</span> &#123;under deployment&#125; <br />
                    or mayabe it <span className="text-red-500"> does not!</span>
                </h2>
                <p className="text-gray-600 mt-4">
                    Either way, you can always go back to the homepage.
                </p>
            </div>
        </div>
    );
}



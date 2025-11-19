import React from 'react'

function Search({ searchTerm, setSearchTerm, handleClearSearch, handleSearch }) {
    return (
        <div className="flex flex-col sm:flex-row w-full relative md:items-center xl:max-w-lg gap-3">
            <div className="relative flex-1 w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full py-1 px-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                        ✕
                    </button>
                )}
            </div>
            <button
                onClick={handleSearch}
                className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Search
            </button>
        </div>
    )
}

export default Search
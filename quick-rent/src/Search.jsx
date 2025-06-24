import React from 'react'

function Search({ search, setSearch }) {

    return (
        <main className=''>

            <input className='placeholder-[var(--text)] text-[var(--text)] m-1 p-2 pl-4 border-solid border-2 border-[var(--primary)] w-100 rounded-md'
                type='text' value={search} placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)} >
            </input>

        </main>

    )
}

export default Search
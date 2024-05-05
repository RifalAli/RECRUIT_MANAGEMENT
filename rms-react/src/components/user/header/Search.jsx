import react from 'react'

const Search = () => {
    return (
        <>
            <input
                type='text'
                name='search'
                className='search'
                placeholder='search...'
            />
            <button>Search</button>
        </>
    )
}

export default Search
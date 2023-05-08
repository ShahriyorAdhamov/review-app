import React from 'react'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { searchTxtContainer } from '../slice/search';


function Search() {

    const dispatch = useDispatch()
    const [searchTxt,setSearchTxt] = useState('');
    dispatch(searchTxtContainer(searchTxt));



    return (
        <>
            <input type="text" placeholder='Search' 
            className='w-50 border-secondary mb-2' 
            onChange={e => setSearchTxt(e.target.value)} value={searchTxt}/>
            <ul className="autocomplete">
                <li className="autocomplete__item"></li>
            </ul>
        </>
    )
}

export default Search;


import React, { useState }from "react";

function Search({history}) {
    const [ keyword, setKeyWord ] = useState('');
    const seachHandler = (e) => {
        e.preventDefault()
        if( keyword.trim() ) {
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

     return (
          <form className="form-inline" onSubmit={ seachHandler }>
               <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeyWord(e.target.value)}/>
               <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
                    Tìm kiếm
               </button>
          </form>
     );
}

export default Search;

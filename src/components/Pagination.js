import {useEffect, useState} from 'react'

export default function Pagination (props){ 
    
    const [pages, setPages] = useState([])
    const [lastPage, setLastPage] = useState([])
    
    useEffect(()=>{
        fetch(`https://jordan.ashton.fashion/api/goods/30/comments`)
            .then(response=> response.json())
            .then(response =>{
                setLastPage(response.last_page)
                let pagesForPagination = response.last_page;
                let a = []
                for (let i=pagesForPagination; i>0; i--){ 
                    a.push(i)
                }
                setPages(a)
        })
        
    },[])
   

   function paginationHandler (event){ 
    let t = event.target.getAttribute('data-key')
    if (t===1){ 
        props.setClassbutton('hiden');
    }
    else {
        props.setClassbutton('');
    }
    fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${t}`)
    .then(response=> response.json())
    .then(response =>{
        props.setComments(response.data.reverse());
    })
   }

    return(
        <div onClick={paginationHandler} >
            {pages.map(item=><button className='page-item btn-secondary'key={item} data-key={item}>{lastPage +1-item}</button>)}
        </div>
    )
}
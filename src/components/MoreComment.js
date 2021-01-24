
export default function MoreComment (props){ 
    

    function moreComments (){ 
        
        let a = props.currentPage; 
        a--
        props.setCurrentPage(a)
       
              
        if(props.data.last_page > props.currentPage && props.currentPage>1 ){
          fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${props.currentPage}`)
          .then(response=> response.json())
          .then(response =>{ 
            let newC = response.data.reverse()
            let allcomments =[...props.comments]
            for(let i=0; i<newC.length; i++){ 
                allcomments.push(newC[i])
              }
            props.setComments(allcomments)
            
          })
      }
        else if (props.currentPage === 1){ 
          fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${props.currentPage}`)
          .then(response=> response.json())
          .then(response =>{ 
            let newC = response.data.reverse()
            let allcomments =[...props.comments]
            for(let i=0; i<newC.length; i++){ 
                allcomments.push(newC[i])
              }
            props.setComments(allcomments)
        
      })
          props.setClassbutton('hiden')
        }
      
        
    }
    return ( 
        <div className={props.classButton}>
          <button className='btn btn-secondary button-more' onClick={moreComments}>Показать еще</button>
        </div>
    )
}
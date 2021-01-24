import './App.css';
import { useEffect, useState} from 'react'
import NewComment from './components/NewComment'
import MoreComment from './components/MoreComment'
import Pagination from './components/Pagination'




function App() {

const [comments,setComments]=useState([])
const [data,setData]=useState()
const [countComment, setCountComment] = useState(2)
const [classButton,setClassbutton]=useState('')
const [currentPage,setCurrentPage]=useState(2); 


useEffect(()=>{

  fetch(`https://jordan.ashton.fashion/api/goods/30/comments`)
  .then(response=> response.json())
  .then(response =>{
      fetch(response.last_page_url)
      .then(response1=> response1.json())
      .then(response1 =>{
          setComments(response1.data.reverse())
          setData(response1)
          setCurrentPage(response.last_page-1)
        })
  })

},[countComment])

  return (
    <div>
      <nav>
       <h2 className='liveFeedback'>Оставьте отзыв о товаре</h2>
       </nav>
    <div className="App container">
     
      <div>
        <NewComment countComment ={countComment} setCountComment={setCountComment}  setClassbutton= {setClassbutton} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <h2 className='comments-h2'>Комментарии пользователей</h2>
        <Pagination setComments={setComments} setClassbutton= {setClassbutton}/>
        <ul className='list-com'>
        {comments.map(item=><li key={item.id}>
          <div className='comments-data'>
            <p className='name-comment'>Имя: {item.name} </p>
            <p className='name-comment'>Дата и время создания: {item.created_at!=null?item.created_at.split('T')[0]+' '+item.created_at.split('T')[1].split('.')[0]:'неизвестно'} </p>
          </div>
          <h6 className='text-comment'>{item.text}</h6>
          </li>)}
        </ul>
      </div>
        <MoreComment data={data} setData={setData} comments={comments} setComments={setComments} classButton={classButton} setClassbutton= {setClassbutton} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
    </div>
  );
}

export default App;

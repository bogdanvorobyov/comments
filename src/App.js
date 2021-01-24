// Реализация вывода комментариев сортирована по принципу "сначала новые". Так логичнее, интересней и сложней. 
// В данном случае, возможно, было бы лучше получить все комментарии без сортировки на сервере, залить их в хранилище через Redux, и построить полноценную пагинацию через реакт; 


import './App.css'; 
import { useEffect, useState} from 'react'
import NewComment from './components/NewComment' // Отправка нового комментария
import MoreComment from './components/MoreComment' // Реализация кнопки "показать еще"
import Pagination from './components/Pagination'// Пагинация 


function App() {

const [comments,setComments]=useState([]) //Вывод комментариев
const [data,setData]=useState() // объект json 
const [countComment, setCountComment] = useState(2) // сбор страниц для пагинации
const [classButton,setClassbutton]=useState('') // скрытие кнопки 
const [currentPage,setCurrentPage]=useState(2); // вывод текущей страницы


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

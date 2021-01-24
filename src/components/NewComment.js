
export default function NewComment (props){ 

    
    function sendNewComment (event){ 
        event.preventDefault()
        let t = event.target.elements
        fetch(`https://jordan.ashton.fashion/api/goods/30/comments?name=${t.name.value}&text=${t.text.value}`,{ 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response=> response.json())
            .then(response =>{
                console.log(response.data)
  })
        let a= props.countComment
        a++
        props.setCountComment(a)
        console.log(props.countComment)
        props.setClassbutton('')
        props.setCurrentPage(2)
    }

    return(
        <>
            
        <form action="" onSubmit={sendNewComment}>
            <input type="text" className="form-control input-name" name='name' placeholder='Введите Ваше имя'/>
            <br/>
            <textarea type="text" className="form-control input-name" name='text' placeholder='Введите Комментарий'/>
            <br/>
            <button className='btn btn-secondary form-control'type='submit'>Отправить</button>
        </form>
        </>
    )
}
import logo from './logo.svg';
import './App.css';
// 컴포넌트(사용자 정의 태그) 생성
function Header(props) {
  // props == 태그 속성들
  const title = props.title;
  return <header>
    <h1><a href="/" onClick={(e)=> {
      // event 값을 callback해줌
      e.preventDefault(); // 고유 이벤트 기능 막기
      // onChangeMode()는 함수명
      // props를 통해 onChangeMode()에 정의된 함수를 실행
      props.onChangeMode();
    }}>{title}</a></h1>
  </header>
}

function Nav(props) {
  // react 에서 자동으로 태그를 생성 할 시 해당 태그에 고유한 key 값을 줘야함
  const list = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i]
    list.push(<li key={t.id}><a href={'read/'+t.id}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {list}
    </ol>
  </nav>
}
function Article(props) {
  const title = props.title;
  const body = props.body;
  return <article>
    <h2>{title}</h2>
    {body}
  </article>
}
function App() {
  //const : 상수로 선언할 때 사용하는 예약어
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={(e)=>{
        alert('Header');
      }}/>
      <Nav topics={topics}/>
      <Article title="Welcom" body="Hello, WEB"/>
    </div>
  );
}

export default App;

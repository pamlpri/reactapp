import './App.css';
// 컴포넌트(사용자 정의 태그) 생성
function Header(props) {
  // props == 태그 속성들
  const title = props.title;
  return <header>
    <h1><a href="/" onClick={(e)=> {
      // event 값을 callback해줌
      e.preventDefault(); // 고유 이벤트 기능 막기
      // onChangeMode()는 prop명
      props.onChangeMode();
    }}>{title}</a></h1>
  </header>
}

function Nav(props) {
  // react 에서 자동으로 태그를 생성 할 시 해당 태그에 고유한 key 값을 줘야함
  const list = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i]
    // 방식1. 태그에 id 속성을 부여하여 넘겨주는 방식
    list.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={e=>{
        e.preventDefault();
        props.onChangeMode(e.target.id);
      }}>{t.title}</a>
    </li>)
    // 방식2. 바로 id 값을 넘겨주는 형식
    // list.push(<li key={t.id}>
    //   <a href={'/read/'+t.id} onClick={e=>{
    //     e.preventDefault();
    //     props.onChangeMode(t.id);
    //   }}>{t.title}</a>
    // </li>)
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
  const mode = 'WELCOME';
  //const : 상수로 선언할 때 사용하는 예약어
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcom" body="Hello, WEB"/>
  } else if(mode === 'READ'){
    content = <Article title="Read" body="Hello, Read"/>
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={()=>{
        // 화살표 함수 [함수명 = ()=> {...}]
        // alert('Header');
        mode = 'WELCOME';
      }}/>
      <Nav topics={topics} onChangeMode={(id)=>{
        // alert(id);
        mode = 'READ';
      }}/>
      {/* <Article title="Welcom" body="Hello, WEB"/> */}
      {content}
    </div>
  );
}

export default App;

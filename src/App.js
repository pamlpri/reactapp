import './App.css';
/*
  React Hooks 개념 중 하나인 UseState()
  useState : 컴포넌트가 가질 수 있는 상태
  [형식] const [state, setState] = useState(초기값);
    - 자바로 치면 setter 느낌
*/
import { useState } from 'react';
/* Header */
// 컴포넌트(사용자 정의 태그) 생성
function Header(props) {
  // props == 태그 속성들
  const title = props.title;
  return <header>
    <h1><a href="/" onClick={(e)=> {
      // event 값을 callback해줌
      // e.preventDefault(); // 고유 이벤트 기능 막기
      // onChangeMode()는 prop명
      props.onChangeMode();
    }}>{title}</a></h1>
  </header>
}
/* Nav */
function Nav(props) {
  // react 에서 자동으로 태그를 생성 할 시 해당 태그에 고유한 key 값을 줘야함
  const list = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i]
    // 방식1. 태그에 id 속성을 부여하여 넘겨주는 방식
    list.push(<li key={t.id}>
      <a id={t.id} href={"/read/"+t.id} onClick={e=>{
        e.preventDefault();
        // e.target.id 는 id 태그로 인해 숫자가 아닌 문자형이 되었기 때문에 Number 형변환
        props.onChangeMode(Number(e.target.id));
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
/* Article */
function Article(props) {
  const title = props.title;
  const body = props.body;
  return <article>
    <h2>{title}</h2>
    {body}
  </article>
}
/* Create */
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={e=>{
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'/></p>
      <p><input type="submit" value="create"/></p>
    </form>
  </article>
}
/* Update */
function Update(props) {
  /*
    props : 사용자가 외부에서 내부로 전달하는 값
    state : 내부자가 사용하는 값
    즉, props로 받은 데이터는 내부 사용자가 임의로 변경할 수 없기 때문에 useState()를 사용하여 내부 사용자가 변경 할 수 있도록
     props 데이터를 state로 변환 필요

    onChange() 이벤트를 통해 setter 작업 진행(데이터가 바뀔때마다 setter 해서 state인 title 값을 변경)
   */
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={e=>{
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title' value={title} onChange={e=>{setTitle(e.target.value)}}/></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={e=>{setBody(e.target.value)}}/></p>
      <p><input type="submit" value="update"/></p>
    </form>
  </article>
}
function App() {
  /*
    *** useState() 개념 ***
    const _mode = useState('WELCOME');
    const mode = _mode[0]; // 상태 값
    const setMode = _mode[1]; // _mode[0] 값을 변경할 수 있음(setter)

    [형식] const [state, setState] = useState(초기값);
   */
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  //const : 상수로 선언할 때 사용하는 예약어
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]);
  // topics를 클릭하는거에 따른 content 변경
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcom" body="Hello, WEB"/>
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}/>
    // react에선 태그를 묶을 땐 하나의 태그 안에서만 가능 (<></> : 제목이 없는 빈 태그 생성)
    contextControl = <>
      <li><a href={"/update/"+id} onClick={e=>{
        e.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={e=>{
        const newTopics = []
        for(let i=0; i<topics.length; i++) {
          if(topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }}/></li>
    </>
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      /*
        useState() 예외 사용법(일반 타입과 범객체 타입의 처리 방식)
        1. const [value, setValue] = useState(PRIMITIVE);
           PRIMITIVE : string, number, bigint, boolean, undefined, symbol, null
        2. const [value, setValue] = useState(Object);
           Object : object, array
          2-1. 기존 value 값을 새로운 newValue 값에 복제하기
            newValue = {...value};  |  newValue = [...value];
          2-2. 복제한 변수에 데이터 처리하기
            newValue.push(~~~);     |  newValue.push(~~~);
          2-3. 복제한 변수를 setter 해줌으로써 상태 변경
            setValue(newValue);     | setvalue(newValue);
      */
      const newTopic = {id:nextId, title: _title, body: _body} // 신규 topic 데이터
      const newTopics = [...topics]; // 기존 topics 를 newTopics 변수에 복제
      newTopics.push(newTopic); // 복제한 변수에 데이터 push
      setTopics(newTopics); // 새로운 변수를 setter 작업 진행
      
      // 데이터가 잘 등록 됐으면 상세페이지로 이동
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1); // 다음 데이터 넣을 때 id 값을 +1
    }}/>
  } else if(mode === 'UPDATE') {
    // 해당 id값의 title과 body 추출작업
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body)=>{
      const newTopics = [...topics];  // 기존 topcis를 newTopics 변수에 복제
      const updateTopic = {id:id, title: _title, body: _body}; // updateTopic 변수에 데이터 초기화
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id) { // 복제한 변수의 id와 현재 페이지의 id값이 일치하면
          newTopics[i] = updateTopic; // 복제한 newTopics[i]에 데이터 덮어쓰기
          break;
        }
      }
      setTopics(newTopics); // 복제한 변수를 setter 진행
      // 데이터 변경이 이루어졌으니 상세페이지인 'READ'로 이동작업
      setMode('READ');
    }}/>
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={()=>{
        // 화살표 함수 [함수명 = ()=> {...}]
        // alert('Header');
        // mode = 'WELCOME';
        setMode('WELCOME');
      }}/>
      <Nav topics={topics} onChangeMode={(_id)=>{
        // alert(id);
        // mode = 'READ';
        setMode('READ');
        setId(_id)
      }}/>
      {/* <Article title="Welcom" body="Hello, WEB"/> */}
      {content}
      <ul>
        <li><a href="/create" onClick={e=>{
          e.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;

import {firebaseConfig} from './firebase-config.js';
const status=document.getElementById('cloudStatus');
const say=s=>status.textContent=s;
if(!firebaseConfig){say('未設定：端末内保存。Firebase設定後に同期が使えます。');}
else {
  try {
    const [{initializeApp},{getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged},{getFirestore,doc,getDoc,setDoc,onSnapshot}]=await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js')
    ]);
    const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
    let activeUser=null,stopListening=null,ready=false,applyingRemote=false,queue=Promise.resolve();
    const docFor=u=>doc(db,'studyProgress',u.uid);
    const credentials=()=>[document.getElementById('cloudEmail').value.trim(),document.getElementById('cloudPassword').value];
    document.getElementById('cloudSignup').onclick=async()=>{try{const [email,pwd]=credentials();await createUserWithEmailAndPassword(auth,email,pwd)}catch(e){say('登録失敗：'+e.message)}};
    document.getElementById('cloudLogin').onclick=async()=>{try{const [email,pwd]=credentials();await signInWithEmailAndPassword(auth,email,pwd)}catch(e){say('ログイン失敗：'+e.message)}};
    document.getElementById('cloudLogout').onclick=()=>signOut(auth);
    window.addEventListener('study-local-change',e=>{if(!ready||!activeUser||applyingRemote)return;const snapshot=structuredClone(e.detail),u=activeUser;queue=queue.then(()=>setDoc(docFor(u),{state:snapshot,updatedAt:Date.now()})).then(()=>say('クラウド同期済み')).catch(err=>say('同期エラー：'+err.message));});
    onAuthStateChanged(auth,async u=>{
      ready=false;activeUser=u;if(stopListening){stopListening();stopListening=null;}
      if(!u){say('ログアウト中：端末内保存');return;}
      say('ログイン済み：同期を準備中');
      try{
        const snap=await getDoc(docFor(u));
        if(snap.exists()&&snap.data().state){applyingRemote=true;data=snap.data().state;save();render();applyingRemote=false;}
        else{await setDoc(docFor(u),{state:data,updatedAt:Date.now()});}
        ready=true;say('クラウド同期中：'+u.email);
        stopListening=onSnapshot(docFor(u),s=>{if(!s.exists()||!s.data().state)return;const remote=s.data().state;if(JSON.stringify(remote)===JSON.stringify(data))return;applyingRemote=true;data=remote;save();render();applyingRemote=false;},e=>say('同期エラー：'+e.message));
      }catch(e){applyingRemote=false;say('同期開始エラー：'+e.message);}
    });
  }catch(e){say('Firebaseの読み込みに失敗：'+e.message);}
}
